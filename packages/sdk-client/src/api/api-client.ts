import { RequestBody, RequestOptions } from '../plugins';
import { ApiClientOptions } from './api-client-options';
import { Headers } from 'node-fetch';

export enum PaginationEnum {
  NONE,
  TOKEN,
  PAGE
}
export interface ApiListPromise<T> extends Promise<PageResult<T>>, AsyncIterableIterator<T> {
}

export type PageResult<T> = {
  data: Array<T>;
  hasNextPage: boolean;
  nextPageValue: string;
  nextPage: () => ApiListPromise<T>;
};

export type AutoPaginationMethods<T> = {
  next: () => Promise<IteratorResult<T>>;
  return: () => void;
  [Symbol.asyncIterator]: () => AutoPaginationMethods<T>;
};

export interface ApiCallParameters {
  url: string,
  requestOptions: RequestOptions,
  apiName: string,
  operationId: string,
  circuitBreaker?: number,
}

export interface ApiCallParametersWithPagination extends ApiCallParameters {
  pagination: PaginationEnum,
  dataKey: string,
  requestOptionsPromise?: Promise<RequestOptions>,
}

export interface PaginatedApiProperties {
  /** Type of pagination: can be TOKEN or PAGE */
  pagination: PaginationEnum,
  /** Name of the API - for logging purposes */
  apiName: string,
  /** Operation identifier - for logging purposes */
  operationId: string,
  /** Name of the property holding the array of paginated data */
  dataKey: string,
}

/**
 * API Client used to call the server
 */
export class ApiClient {
  /** Options for the API */
  public apiClientOptions: ApiClientOptions;

  constructor(options: ApiClientOptions) {
    this.apiClientOptions = options;
  }

  /**
   * Returns a map containing the query parameters based on the provided data and names.
   *
   * @param {Object} data - The data object from which to extract query parameters.
   * @param {Array.<string>} names - An array of keys (property names) to extract from the data object.
   * @return {Object} A map containing the extracted query parameters.
   */
  extractQueryParams<T extends { [key: string]: any }>(
    data: T,
    names: (keyof T)[],
  ): { [p in keyof T]: string } {
    return names
      .filter((name) => typeof data[name] !== 'undefined' && data[name] !== null)
      .reduce(
        (acc, name) => {
          const prop = data[name];
          acc[name] = typeof prop.toJSON === 'function'
            ? prop.toJSON()
            : Array.isArray(prop) ? prop.join(';') : prop.toString();
          return acc;
        },
        {} as { [p in keyof T]: string },
      );
  }

  /**
   * Asynchronously prepares options for an HTTP request.
   *
   * @param {string} url - The URL for the HTTP request.
   * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST').
   * @param {Object.<string, (string | undefined)>} queryParams - An object representing query parameters.
   * @param {Object.<string, (string | undefined)>} headers - An object representing headers.
   * @param {RequestBody} [body] - The request body, if applicable.
   * @param {string} [path] - An optional path for the request.
   * @return {Promise<RequestOptions>} A promise that resolves to the prepared options for the HTTP request.
   */
  async prepareOptions(
    url: string,
    method: string,
    queryParams: { [key: string]: string | undefined },
    headers: { [key: string]: string | undefined },
    body?: RequestBody,
    path?: string,
  ): Promise<RequestOptions> {
    const options: RequestOptions = {
      method,
      headers: new Headers(filterUndefinedValues(headers)),
      body,
      queryParams: filterUndefinedValues(queryParams),
      basePath: url,
      path,
    };

    let opts = options;
    if (this.apiClientOptions.requestPlugins) {
      for (const plugin of this.apiClientOptions.requestPlugins) {
        opts = await plugin.load().transform(opts);
      }
    }

    return opts;
  };

  /**
   * Prepares the url to be called by appending query parameters.
   *
   * @param {string} url - The base url to be used.
   * @param {Object.<string, string|undefined>} queryParameters - Key-value pair with the parameters. If the value is undefined, the key is dropped.
   * @param {boolean} repeatParamArray - create as many single parameters with each value of the array
   * @return {string} The prepared URL as a string.
   */
  prepareUrl(
    url: string,
    queryParameters: { [key: string]: string | undefined } = {},
    repeatParamArray?: boolean,
  ): string {
    const queryPart = Object.keys(queryParameters)
      .filter((name) => typeof queryParameters[name] !== 'undefined')
      .map((name) => this.formatQueryParameter(name, queryParameters, repeatParamArray))
      .join('&');

    const paramsPrefix = url.indexOf('?') > -1 ? '&' : '?';

    return url + (!queryPart ? '' : paramsPrefix + queryPart);
  }

  /**
   *
   * @param {string} name - The parameter name
   * @param {Object.<string, string|undefined>} queryParameters - Key-value pair with the parameters. If the value is undefined, the key is dropped.
   * @param {boolean}repeatParamArray - Create as many single parameters with each value of the array
   * @return {string} The query parameter formatted as required by the API
   */
  private formatQueryParameter = (
    name: string,
    queryParameters: { [key: string]: string | undefined } = {},
    repeatParamArray?: boolean,
  ): string => {
    const defaultFormat = `${name}=${queryParameters[name]!}`;
    if(repeatParamArray) {
      const parameterValue = queryParameters[name];
      if (parameterValue && parameterValue.indexOf(';') > 0) {
        const parameterValues = parameterValue.split(';');
        return parameterValues.map((value) => `${name}=${value}`).join('&');
      }
    }
    return defaultFormat;
  };

  /**
   * Process HTTP call
   * @abstract
   * @template T
   * @param {ApiCallParameters} _httpCallParameters - Parameters for the HTTP call.
   * @return {Promise<T>} A promise that resolves to the result of the HTTP call.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processCall<T>(_httpCallParameters: ApiCallParameters): Promise<T> {
    throw new Error('Abstract method must be implemented');
  }

  /**
   * Process HTTP call
   * @abstract
   * @template T
   * @param {ApiCallParametersWithPagination} _httpCallParameters - Parameters for the HTTP call.
   * @return {Promise<T>} A promise that resolves to the result of the HTTP call.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processCallWithPagination<T>(_httpCallParameters: ApiCallParametersWithPagination): Promise<PageResult<T>> {
    throw new Error('Abstract method must be implemented');
  }


}

// ----- INTERNAL ------ \\
/**
 * Returns a filtered JSON object, removing all the undefined values.
 *
 * @param {Object.<string, string|undefined>} object - The JSON object to filter.
 * @return {Object.<string, string>} An object without undefined values.
 */
function filterUndefinedValues(object: { [key: string]: string | undefined }): {
  [key: string]: string;
} {
  return Object.keys(object)
    .filter((objectKey) => typeof object[objectKey] !== 'undefined')
    .reduce<{ [key: string]: string }>((acc, objectKey) => {
      acc[objectKey] = object[objectKey] as string;
      return acc;
    }, {});
}
