import { ResponsePlugin } from '../plugins/core/response-plugin';
import { VersionRequest } from '../plugins/version';
import { ExceptionResponse } from '../plugins/exception';
import {
  ApiClient,
  ApiCallParameters,
  ApiCallParametersWithPagination,
  PageResult,
  FileBuffer,
  FileData,
} from '../api/api-client';
import {
  ApiClientOptions,
} from '../api/api-client-options';
import {
  EmptyResponseError,
  ErrorContext,
  GenericError,
  ResponseJSONParseError,
} from '../api/api-errors';
import { Response } from 'node-fetch';
import { buildErrorContext, manageExpiredToken, reviveDates } from './api-client-helpers';
import { resolveLogger } from '../logger';
import { resolveTimeoutSeconds } from '../domain';
import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpTransport,
  toHttpRequest,
} from '../http';
import {
  buildPaginationContext,
  calculateNextPage,
  createNextPageMethod,
  hasMore,
} from './api-client-pagination-helper';
import {
  computeRateLimitBackoffMs,
  parseRetryAfterMs,
  resolveRetryConfig,
  shouldRetryRateLimit,
  sleep,
} from './retry-policy';

/**
 * Context for response processing
 */
interface ResponseContext {
  httpResponse: HttpResponse;
  response: Response;
  body: string | undefined;
  apiCallParameters: ApiCallParameters;
  errorContext: ErrorContext;
}

/**
 * Context for plugin processing
 */
interface PluginContext {
  result: Record<string, any> | undefined;
  exception: Error | undefined;
  responseContext: ResponseContext;
}

/** Client to process the call to the API using Fetch API */
export class ApiFetchClient extends ApiClient {

  private readonly httpTransport: HttpTransport;

  /**
   * Initialize your API Client instance with the provided configuration options.
   * Default request plugins: VersionRequest
   * Default response plugins: ExceptionResponse
   *
   * @param {ApiClientOptions} options - Configuration options for the API Client.
   */
  constructor(options: ApiClientOptions) {
    const logger = resolveLogger(options.logger);
    const retry = resolveRetryConfig(options);
    const resolvedOptions = {
      ...options,
      logger,
      timeoutSeconds: resolveTimeoutSeconds(options.timeoutSeconds),
      retryPolicy: retry.retryPolicy,
      maxRetryCount: retry.maxRetryCount,
      exponentialBackoff: retry.exponentialBackoff,
    };
    super({
      ...resolvedOptions,
      requestPlugins: [new VersionRequest(), ...(resolvedOptions.requestPlugins || [])],
      responsePlugins: [
        new ExceptionResponse(undefined),
        ...(resolvedOptions.responsePlugins || []),
      ],
    });
    this.httpTransport = new HttpTransport();
  }

  /** @inheritdoc */
  public async processCall<T>(apiCallParameters: ApiCallParameters): Promise<T> {
    const responseContext = await this.executeRequest(apiCallParameters);
    return this.processResponse<T>(responseContext);
  }

  /** @inheritdoc */
  public async processCallWithPagination<T>(
    apiCallParameters: ApiCallParametersWithPagination,
  ): Promise<PageResult<T>> {
    const responseContext = await this.executeRequest(apiCallParameters);
    const transformedResponse = await this.processResponse<Record<string, any>>(responseContext);
    return this.buildPageResult<T>(transformedResponse, apiCallParameters);
  }

  /** @inheritdoc */
  public async processFileCall(apiCallParameters: ApiCallParameters): Promise<FileBuffer> {
    const responseContext = await this.executeRequest(apiCallParameters, true);
    return this.processFileResponse(responseContext);
  }

  /** @inheritdoc */
  public async processCsvCall(apiCallParameters: ApiCallParameters): Promise<FileData> {
    const responseContext = await this.executeRequest(apiCallParameters, true);
    return this.processCSVResponse(responseContext);
  }

  private async executeRequest(
    apiCallParameters: ApiCallParameters,
    isFileDownload = false,
  ): Promise<ResponseContext> {
    const errorContext = buildErrorContext(apiCallParameters);

    try {
      const httpResponse = await this.sinchFetch(apiCallParameters, errorContext);
      const body = isFileDownload ? undefined : await httpResponse.content.asString();

      return {
        httpResponse,
        response: httpResponse.nativeResponse,
        body,
        apiCallParameters,
        errorContext,
      };
    } catch (error: any) {
      throw this.buildFetchError(error, errorContext);
    }
  }

  private async processResponse<T>(
    context: ResponseContext,
  ): Promise<T> {
    this.logFailedResponse(context);
    const pluginContext = await this.parseAndValidateResponse(context);
    const transformedResponse = await this.applyResponsePlugins(pluginContext);

    if (pluginContext.exception) {
      throw pluginContext.exception;
    }

    return reviveDates(transformedResponse) as T;
  }

  private async parseAndValidateResponse(
    context: ResponseContext,
  ): Promise<PluginContext> {
    let result: Record<string, any> | undefined;
    let exception: Error | undefined;

    try {
      result = context.body ? JSON.parse(context.body) : undefined;
    } catch (error: any) {
      exception = new ResponseJSONParseError(
        error.message || 'Failed to parse response body',
        (context.response?.status || 0),
        context.errorContext,
        context.body,
      );
    }

    return { result, exception, responseContext: context };
  }

  private async processFileResponse(context: ResponseContext): Promise<FileBuffer> {
    if (!context.response.ok) {
      throw this.buildFetchError(
        new Error('No response received'),
        context.errorContext,
      );
    }

    const buffer = await context.httpResponse.content.asBytes();
    const fileName = this.extractFileName(context.httpResponse.headers, 'pdf');

    if (!buffer || !fileName) {
      throw new Error('An error occurred while downloading the file');
    }

    return { fileName, buffer };
  }

  private async processCSVResponse(context: ResponseContext): Promise<FileData> {
    if (!context.response.ok) {
      throw this.buildFetchError(
        new Error('No response received'),
        context.errorContext,
      );
    }

    const responseText = await context.httpResponse.content.asString();
    const fileName = this.extractFileName(context.httpResponse.headers, 'csv');

    if (!responseText || !fileName) {
      throw new Error('An error occurred while downloading the file');
    }

    return { fileName, data: responseText };
  }

  /**
   * Handle fetch request with token refresh and retry.
   * @param {ApiCallParameters} apiCallParameters
   * @param {ErrorContext} errorContext
   */
  private async sinchFetch(
    apiCallParameters: ApiCallParameters,
    errorContext: ErrorContext,
  ): Promise<HttpResponse> {
    const retryConfig = resolveRetryConfig(this.apiClientOptions);
    let requestOptions = apiCallParameters.requestOptions;
    let httpRequest = toHttpRequest(apiCallParameters, requestOptions);
    let httpResponse = await this.send(httpRequest, requestOptions.timeout);

    if (this.isTokenExpired(httpResponse)) {
      // Capture the JWT used by the failing request so the OAuth2 plugin can
      // refuse to clear a cached token that has since been refreshed by another caller.
      const failingAuth = httpRequest.headers.get('Authorization') || '';
      const failingJwt = failingAuth.startsWith('Bearer ')
        ? failingAuth.slice('Bearer '.length)
        : undefined;
      this.discardResponseBody(httpResponse);
      requestOptions = await manageExpiredToken(
        apiCallParameters,
        errorContext,
        this.apiClientOptions.requestPlugins,
        failingJwt);
      httpRequest = toHttpRequest(apiCallParameters, requestOptions);
      httpResponse = await this.send(httpRequest, requestOptions.timeout);
    }

    for (let attempt = 0; ; attempt++) {
      const retryAfterMs = parseRetryAfterMs(httpResponse.headers.get('retry-after'));
      if (!shouldRetryRateLimit(httpResponse.status, attempt, retryConfig, retryAfterMs)) {
        break;
      }
      await sleep(computeRateLimitBackoffMs(attempt, retryConfig, retryAfterMs));
      this.discardResponseBody(httpResponse);
      httpResponse = await this.send(httpRequest, requestOptions.timeout);
    }

    return httpResponse;
  }

  private send(request: HttpRequest, timeout?: number): Promise<HttpResponse> {
    return this.httpTransport.send(request, { timeout });
  }

  /**
   * Release the unused response stream so sockets can be reused.
   */
  private discardResponseBody(httpResponse: HttpResponse): void {
    const body = httpResponse.nativeResponse.body as { destroy?: () => void } | null | undefined;
    if (body && typeof body.destroy === 'function') {
      body.destroy();
    }
  }

  private isTokenExpired(httpResponse: HttpResponse): boolean {
    return httpResponse.status === 401
      && httpResponse.headers.get('www-authenticate')?.includes('expired') === true;
  }

  private async applyResponsePlugins(context: PluginContext): Promise<Record<string, any>> {
    const plugins = this.loadResponsePlugins(
      this.apiClientOptions.responsePlugins,
      context.responseContext,
    );

    return plugins.reduce(
      async (promise, plugin) => {
        const current = await promise;
        return plugin.transform(current);
      },
      Promise.resolve(context.result || {}),
    );
  }

  private loadResponsePlugins(
    plugins: ResponsePlugin<any>[] | undefined,
    context: ResponseContext,
  ) {
    return (plugins || []).map(plugin =>
      plugin.load({
        response: context.response,
        exception: undefined,
        apiName: context.apiCallParameters.apiName,
        operationId: context.apiCallParameters.operationId,
        url: context.apiCallParameters.url,
        requestOptions: context.apiCallParameters.requestOptions,
      }),
    );
  }

  private buildPageResult<T>(
    transformedResponse: any,
    apiCallParameters: ApiCallParametersWithPagination,
  ): PageResult<T> {
    const responseData: Array<T> = transformedResponse[apiCallParameters.dataKey];
    const paginationContext = buildPaginationContext(apiCallParameters);
    const nextPage = JSON.stringify(calculateNextPage(transformedResponse, paginationContext));

    return {
      data: responseData || [],
      hasNextPage: hasMore(transformedResponse, paginationContext),
      nextPageValue: nextPage,
      nextPage: () => createNextPageMethod<T>(
        this,
        paginationContext,
        apiCallParameters.requestOptions,
        nextPage,
      ),
    };
  }

  private logFailedResponse(context: ResponseContext): void {
    if (!context.response.ok) {
      const { apiCallParameters } = context;
      this.apiClientOptions.logger!.debug(() =>
        `[${apiCallParameters.apiName}][${apiCallParameters.operationId}][${context.httpResponse.status}]\n`
        + `HTTP method: ${apiCallParameters.requestOptions.method}\n`
        + `URL: ${apiCallParameters.url}\n`
        + `Response Headers: ${this.formatResponseHeaders(context.httpResponse.headers)}`,
      );
    }
  }

  private formatResponseHeaders(headers: HttpHeaders): string {
    return [...headers.entries()]
      .map(([key, value]) => `${key}=${String(value)}`)
      .join(', ');
  }

  private buildFetchError(error: any, errorContext: ErrorContext): Error {
    if (error instanceof GenericError) {
      return new GenericError(error.message, errorContext);
    } else {
      return new EmptyResponseError(
        error.message || 'Fail to fetch',
        errorContext,
      );
    }
  }

  private extractFileName(headers: HttpHeaders, extension: string) {
    const contentDisposition = headers.get('content-disposition');
    let fileName = 'default-name.' + extension;
    if (contentDisposition) {
      // Support both quoted and unquoted filenames
      const match = contentDisposition.match(/filename[*]?=['"]?([^'";\r\n]+)['"]?/i);
      if (match && match[1]) {
        fileName = match[1];
      }
    }
    return fileName;
  }

}
