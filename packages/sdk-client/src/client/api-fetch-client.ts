import { ResponsePlugin } from '../plugins/core/response-plugin';
import { VersionRequest } from '../plugins/version';
import { ExceptionResponse } from '../plugins/exception';
import { TimezoneResponse } from '../plugins/timezone';
import {
  ApiClient,
  ApiClientOptions,
  EmptyResponseError,
  ErrorContext,
  GenericError,
  ApiCallParameters,
  ResponseJSONParseError,
  ApiCallParametersWithPagination,
  PageResult,
  FileBuffer,
} from '../api';
import fetch, { Response, Headers } from 'node-fetch';
import FormData = require('form-data');
import { buildErrorContext, manageExpiredToken, reviveDates } from './api-client-helpers';
import {
  buildPaginationContext,
  calculateNextPage,
  createNextPageMethod,
  hasMore,
} from './api-client-pagination-helper';

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
        new TimezoneResponse(),
        new ExceptionResponse(),
        ...(options.responsePlugins || []),
      ],
    });
  }

  /** @inheritdoc */
  public async processCall<T>(
    props: ApiCallParameters,
  ): Promise<T> {
    // Read the "Origin" header if existing, for logging purposes
    const origin = (props.requestOptions.headers as Headers).get('Origin');
    const errorContext: ErrorContext = buildErrorContext(props, origin);

    // Declare variables
    let response: Response | undefined;
    let body: string | undefined;
    let exception: Error | undefined;

    // Execute call
    try {
      // Send the request with the refresh token mechanism
      response = await this.sinchFetch(props, errorContext);
      body = await response.text();
    } catch (error: any) {
      this.buildFetchError(error, errorContext);
    }

    let result;
    try {
      // Try to parse the body if there is one
      result = body ? JSON.parse(body) : undefined;
    } catch (error: any) {
      exception = new ResponseJSONParseError(
        error.message || 'Fail to parse response body',
        (response && response.status) || 0,
        errorContext,
        body,
      );
    }

    // Load and invoke the response plugins to transform the response
    const responsePlugins = this.loadResponsePlugins(
      this.apiClientOptions.responsePlugins,
      props,
      response,
      exception,
      origin);
    let transformedResponse = result;
    for (const pluginRunner of responsePlugins) {
      transformedResponse = await pluginRunner.transform(transformedResponse);
    }

    // If there has been an error at some point in the process, throw it
    if (exception) {
      throw exception;
    }

    // If everything went fine, we apply a last transformation to revive the dates, and we return the transformed API response
    return reviveDates(transformedResponse);
  }

  private async sinchFetch(
    apiCallParameters: ApiCallParameters,
    errorContext: ErrorContext,
  ): Promise<Response> {
    const response = await fetch(apiCallParameters.url, apiCallParameters.requestOptions);
    if (
      response.status === 401
        && response.headers.get('www-authenticate')?.includes('expired')
    ) {
      return manageExpiredToken(
        apiCallParameters,
        errorContext,
        this.apiClientOptions.requestPlugins,
        apiCallParameters.requestOptions,
        this.processCall);
    }
    return response;
  }

  public processCallWithPagination<T>(
    props: ApiCallParametersWithPagination,
  ): Promise<PageResult<T>> {
    // Read the "Origin" header if existing, for logging purposes
    const origin = (props.requestOptions.headers as Headers).get('Origin');
    const errorContext: ErrorContext = buildErrorContext(props, origin);

    // Execute call
    return this.sinchFetchWithPagination<T>(props, errorContext, origin);
  };

  private async sinchFetchWithPagination<T>(
    apiCallParameters: ApiCallParametersWithPagination,
    errorContext: ErrorContext,
    origin: string | null,
  ): Promise<PageResult<T>> {
    let exception: Error | undefined;
    const response = await fetch(apiCallParameters.url, apiCallParameters.requestOptions);
    if (
      response.status === 401
      && response.headers.get('www-authenticate')?.includes('expired')
    ) {
      return manageExpiredToken(
        apiCallParameters,
        errorContext,
        this.apiClientOptions.requestPlugins,
        apiCallParameters.requestOptions,
        this.processCallWithPagination);
    }
    // When handling pagination, we won't return the raw response but a PageResult
    const body = await response.text();
    let result;
    try {
      // Try to parse the body if there is one
      result = body ? JSON.parse(body) : undefined;
    } catch (error: any) {
      exception = new ResponseJSONParseError(
        error.message || 'Fail to parse response body',
        (response && response.status) || 0,
        errorContext,
        body,
      );
    }

    // Load and invoke the response plugins to transform the response
    const responsePlugins = this.loadResponsePlugins(
      this.apiClientOptions.responsePlugins,
      apiCallParameters,
      response,
      exception,
      origin);
    let transformedResponse = result;
    for (const pluginRunner of responsePlugins) {
      transformedResponse = await pluginRunner.transform(transformedResponse);
    }

    // Revive Date objects
    transformedResponse = reviveDates(transformedResponse);

    // If there has been an error at some point in the process, throw it
    if (exception) {
      throw exception;
    }

    // Read the elements' array with its key
    const responseData: Array<T> = transformedResponse[apiCallParameters.dataKey];
    // Build the PageResult object
    const nextPage = JSON.stringify(calculateNextPage(transformedResponse, buildPaginationContext(apiCallParameters)));
    return {
      data: responseData || [],
      hasNextPage: hasMore(transformedResponse, buildPaginationContext(apiCallParameters)),
      nextPageValue: nextPage,
      nextPage: () => createNextPageMethod<T>(
        this, buildPaginationContext(apiCallParameters), apiCallParameters.requestOptions, nextPage),
    };
  }

  private buildFetchError(error: any, errorContext: ErrorContext): Error {
    if (error instanceof GenericError) {
      return new GenericError(error.message, errorContext);
    } else {
      return new EmptyResponseError(
        error.message || 'Fail to fetch',
        errorContext,
        undefined,
      );
    }
  }

  private loadResponsePlugins(
    responsePlugins: ResponsePlugin<any>[] | undefined,
    apiCallParameters: ApiCallParameters,
    response: Response | undefined,
    exception: Error | undefined,
    origin: string | null,
  ) {
    return responsePlugins
      ? responsePlugins.map((plugin) =>
        plugin.load({
          response,
          exception,
          apiName: apiCallParameters.apiName,
          operationId: apiCallParameters.operationId,
          url: apiCallParameters.url,
          requestOptions: apiCallParameters.requestOptions,
          origin,
        }),
      )
      : [];
  }

  /** @inheritdoc */
  public async processFileCall(
    props: ApiCallParameters,
  ): Promise<FileBuffer> {
    // Read the "Origin" header if existing, for logging purposes
    const origin = (props.requestOptions.headers as Headers).get('Origin');
    const errorContext: ErrorContext = buildErrorContext(props, origin);

    // Declare variables
    let response: Response | undefined;
    let body: Buffer | undefined;
    let fileName: string | undefined;

    // Execute call
    try {
      // Send the request with the refresh token mechanism
      response = await this.sinchFetch(props, errorContext);
      body = await response.buffer();
      fileName = this.extractFileName(response.headers);
    } catch (error: any) {
      this.buildFetchError(error, errorContext);
    }

    if (!body || !fileName) {
      throw new Error('An error occurred while downloading the file');
    }

    return {
      fileName,
      buffer: body,
    };
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

  /** @inheritDoc */
  public processFormData(data: any, type: string): FormData | string {

    let encodedData: FormData | string;

    if (type === 'multipart/form-data') {
      const formData: FormData = new FormData();
      for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          formData.append(i, data[i]);
        }
      }
      encodedData = formData;
    } else {
      const formData: string[] = [];
      for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
          formData.push(`${i}=${encodeURIComponent(data[i])}`);
        }
      }
      encodedData = formData.join('&');
    }

    return encodedData;
  }
}
