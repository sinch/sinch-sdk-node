import { ResponsePlugin } from '../plugins/core/response-plugin';
import { VersionRequest } from '../plugins/version';
import { ExceptionResponse } from '../plugins/exception';
import {
  ApiClient,
  ApiCallParameters,
  ApiCallParametersWithPagination,
  PageResult,
  FileBuffer,
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
import fetch, { Response, Headers } from 'node-fetch';
import { buildErrorContext, manageExpiredToken, reviveDates } from './api-client-helpers';
import {
  buildPaginationContext,
  calculateNextPage,
  createNextPageMethod,
  hasMore,
} from './api-client-pagination-helper';

/**
 * Context for response processing
 */
interface ResponseContext {
  response: Response | undefined;
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

  /**
   * Initialize your API Client instance with the provided configuration options.
   * Default request plugins: VersionRequest
   * Default response plugins: ExceptionResponse
   *
   * @param {ApiClientOptions} options - Configuration options for the API Client.
   */
  constructor(options: ApiClientOptions) {
    super({
      ...options,
      requestPlugins: [new VersionRequest(), ...(options.requestPlugins || [])],
      responsePlugins: [
        new ExceptionResponse(),
        ...(options.responsePlugins || []),
      ],
    });
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

  private async executeRequest(
    apiCallParameters: ApiCallParameters,
    isFileDownload = false,
  ): Promise<ResponseContext> {
    const errorContext = buildErrorContext(apiCallParameters);

    try {
      const response = await this.sinchFetch(apiCallParameters, errorContext);
      const body = isFileDownload ? undefined : await response.text();

      return {
        response,
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
    if (!context.response) {
      throw this.buildFetchError(
        new Error('No response received'),
        context.errorContext,
      );
    }

    const buffer = await context.response.buffer();
    const fileName = this.extractFileName(context.response.headers);

    if (!buffer || !fileName) {
      throw new Error('An error occurred while downloading the file');
    }

    return { fileName, buffer };
  }

  /**
   * Handle fetch request with token refresh mechanism
   * @param {ApiCallParameters} apiCallParameters
   * @param {ErrorContext} errorContext
   */
  private async sinchFetch(apiCallParameters: ApiCallParameters, errorContext: ErrorContext) {
    let response = await fetch(apiCallParameters.url, apiCallParameters.requestOptions);

    if (this.isTokenExpired(response)) {
      const requestOptions = await manageExpiredToken(
        apiCallParameters,
        errorContext,
        this.apiClientOptions.requestPlugins);
      response = await fetch(apiCallParameters.url, requestOptions);
    }

    return response;
  }

  private isTokenExpired(response: Response): boolean {
    return response.status === 401
      && response.headers.get('www-authenticate')?.includes('expired') === true;
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

  private extractFileName(headers: Headers) {
    const contentDisposition = headers.get('content-disposition');
    let fileName = 'default-name.pdf';
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="([^"]+)"/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }
    return fileName;
  }

}
