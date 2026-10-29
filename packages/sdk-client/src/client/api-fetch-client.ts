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
  ApiHttpError,
  EmptyResponseError,
  ErrorContext,
  GenericError,
  ResponseJSONParseError,
} from '../api/api-errors';
import { Response } from 'node-fetch';
import { buildErrorContext, manageExpiredToken, reviveDates } from './api-client-helpers';
import { resolveLogger } from '../logger';
import { resolveTimeoutSeconds, WithRetryPolicy } from '../domain';
import {
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '../http';
import {
  FetchHttpTransport,
  toHttpRequest,
} from '../http/fetch';
import {
  buildPaginationContext,
  calculateNextPage,
  createNextPageMethod,
  hasMore,
} from './api-client-pagination-helper';
import {
  computeRateLimitBackoffMs,
  parseRetryAfterMs,
  ResolvedRetryConfig,
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
 * Settings overriding the client ones for a single call
 */
export interface CallOverrides {
  /** Retry settings: undefined entries fall back to the client ones */
  retry?: WithRetryPolicy;
  /**
   * Whether a 401 with an expired JWT triggers an OAuth2 token refresh
   * @default true
   */
  refreshExpiredToken?: boolean;
}

/**
 * Resolved per-call settings for the fetch loop
 */
interface SinchFetchOptions {
  retryConfig?: ResolvedRetryConfig;
  refreshExpiredToken?: boolean;
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

  private readonly httpTransport: FetchHttpTransport;

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
      requestPlugins: [
        new VersionRequest(resolvedOptions.implementationType),
        ...(resolvedOptions.requestPlugins || []),
      ],
      responsePlugins: [
        new ExceptionResponse(undefined),
        ...(resolvedOptions.responsePlugins || []),
      ],
    });
    this.httpTransport = new FetchHttpTransport();
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

  /**
   * Process HTTP call and return the raw response, without parsing the body.
   * Token refresh and rate-limit retries are applied as for any other call.
   * @param {ApiCallParameters} apiCallParameters - Parameters for the HTTP call.
   * @param {CallOverrides} [overrides] - Retry and token refresh settings overriding the client ones for this call.
   * @return {Promise<HttpResponse>} The response, with a body still available for lazy parsing.
   * @throws {ApiHttpError} when the response status is >= 400.
   */
  public async processHttpCall(
    apiCallParameters: ApiCallParameters,
    overrides: CallOverrides = {},
  ): Promise<HttpResponse> {
    const errorContext = buildErrorContext(apiCallParameters);
    // Resolved outside the fetch error handling so an invalid setting surfaces as a configuration error
    const retryConfig = resolveRetryConfig({ ...this.apiClientOptions, ...definedValues(overrides.retry) });
    let httpResponse: HttpResponse;
    try {
      httpResponse = await this.sinchFetch(apiCallParameters, errorContext, {
        retryConfig,
        refreshExpiredToken: overrides.refreshExpiredToken,
      });
    } catch (error: any) {
      throw this.buildFetchError(error, errorContext);
    }

    if (httpResponse.status >= 400) {
      this.logFailedResponse(apiCallParameters, httpResponse);
      const body = await httpResponse.content.asString();
      let data: unknown = body || undefined;
      try {
        data = body ? JSON.parse(body) : undefined;
      } catch {
        // Not a JSON payload: keep the raw text
      }
      throw new ApiHttpError(httpResponse, errorContext, data);
    }
    return httpResponse;
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
        response: this.httpTransport.getNativeResponse(httpResponse),
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
    this.logFailedResponse(context.apiCallParameters, context.httpResponse);
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
        new Error(`HTTP ${context.httpResponse.status}`),
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
        new Error(`HTTP ${context.httpResponse.status}`),
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
   * @param {SinchFetchOptions} [options] - Per-call retry and token refresh settings
   */
  private async sinchFetch(
    apiCallParameters: ApiCallParameters,
    errorContext: ErrorContext,
    options: SinchFetchOptions = {},
  ): Promise<HttpResponse> {
    const retryConfig = options.retryConfig ?? resolveRetryConfig(this.apiClientOptions);
    let requestOptions = apiCallParameters.requestOptions;
    let httpRequest = toHttpRequest(apiCallParameters, requestOptions);
    let httpResponse = await this.send(httpRequest, requestOptions.timeout);

    if ((options.refreshExpiredToken ?? true) && this.isTokenExpired(httpResponse)) {
      // Capture the JWT used by the failing request so the OAuth2 plugin can
      // refuse to clear a cached token that has since been refreshed by another caller.
      const failingAuth = httpRequest.headers.getAll('Authorization')[0] || '';
      const failingJwt = failingAuth.startsWith('Bearer ')
        ? failingAuth.slice('Bearer '.length)
        : undefined;
      this.httpTransport.release(httpResponse);
      requestOptions = await manageExpiredToken(
        apiCallParameters,
        errorContext,
        this.apiClientOptions.requestPlugins,
        failingJwt);
      httpRequest = toHttpRequest(apiCallParameters, requestOptions);
      httpResponse = await this.send(httpRequest, requestOptions.timeout);
    }

    for (let attempt = 0; ; attempt++) {
      const retryAfterMs = parseRetryAfterMs(httpResponse.headers.getAll('retry-after')[0]);
      if (!shouldRetryRateLimit(httpResponse.status, attempt, retryConfig, retryAfterMs)) {
        break;
      }
      await sleep(computeRateLimitBackoffMs(attempt, retryConfig, retryAfterMs));
      this.httpTransport.release(httpResponse);
      httpResponse = await this.send(httpRequest, requestOptions.timeout);
    }

    return httpResponse;
  }

  private send(request: HttpRequest, timeout?: number): Promise<HttpResponse> {
    return this.httpTransport.send(request, { timeout });
  }

  private isTokenExpired(httpResponse: HttpResponse): boolean {
    return httpResponse.status === 401
      && httpResponse.headers.getAll('www-authenticate')[0]?.includes('expired') === true;
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

  private logFailedResponse(apiCallParameters: ApiCallParameters, httpResponse: HttpResponse): void {
    if (httpResponse.status < 200 || httpResponse.status >= 300) {
      this.apiClientOptions.logger!.debug(() =>
        `[${apiCallParameters.apiName}][${apiCallParameters.operationId}][${httpResponse.status}]\n`
        + `HTTP method: ${apiCallParameters.requestOptions.method}\n`
        + `URL: ${apiCallParameters.url}\n`
        + `Response Headers: ${this.formatResponseHeaders(httpResponse.headers)}`,
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
    const contentDisposition = headers.getAll('content-disposition')[0];
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

/** Drop undefined entries so they don't override the client-level settings when spread */
const definedValues = <T extends object>(value?: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(value ?? {}).filter(([, entry]) => entry !== undefined),
  ) as Partial<T>;
