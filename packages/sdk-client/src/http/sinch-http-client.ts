import FormData = require('form-data');
import { readFile } from 'fs/promises';
import { ApiFetchClient } from '../client/api-fetch-client';
import { LazyApiClient } from '../client/lazy-api-client';
import { buildHttpApiClientOptions } from '../api/api-client-options-helper';
import {
  resolveTimeoutSeconds,
  SinchClientParameters,
  TransportSettings,
  WithRetryPolicy,
} from '../domain';
import { resolveClientParameters } from '../logger';
import {
  RequestBody,
  RequestPlugin,
  RequestPluginEnum,
} from '../plugins/core/request-plugin';
import { HttpHeaders } from './http-headers';
import { HttpMethod } from './http-method';
import { HttpResponse } from './http-response';
import { toFetchHeaders } from './fetch/fetch-http-headers';

/** Headers of a low-level HTTP call: names are case-insensitive, a name can hold several values. */
export type HttpRequestHeaders = HttpHeaders | Record<string, string | string[]>;

/** Settings overriding the {@link SinchClientParameters} ones for a single low-level HTTP call. */
export type HttpRequestOptions = Partial<TransportSettings & WithRetryPolicy>;

/** Body of a low-level HTTP call, sent untouched: the `content-type` header must be set by the caller. */
export type HttpBody = string | Buffer | Uint8Array;

/** Form fields sent as `multipart/form-data` by {@link SinchHttpClient.postFormData}. */
export type HttpFormData = FormData | Record<string, string | Buffer>;

export interface HttpCallParameters {
  /** Pre-serialized and URL-encoded query string, including the leading `?`. Sent untouched. */
  queryParams?: string;
  /** Headers to send (`content-type`, `accept`, ...). `User-Agent` and `Authorization` are set by the SDK. */
  headers?: HttpRequestHeaders;
  /** Request-level settings overriding the client ones */
  options?: HttpRequestOptions;
}

/** Helpers to build the body of a low-level HTTP call */
export const HttpHelpers = {
  /**
   * Read a file to be used as body of `post`, `put` or `patch`.
   * @param {string} path - Path of the file to read
   * @return {Promise<Buffer>} The file content
   */
  fromFile: (path: string): Promise<Buffer> => readFile(path),
};

/** @internal */
export class LazyHttpApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      this.apiFetchClient = new ApiFetchClient(buildHttpApiClientOptions(this.sharedConfig));
    }
    return this.apiFetchClient;
  }
}

/**
 * Low-level HTTP client to call any Sinch API, including the endpoints not covered by the SDK.
 *
 * The SDK takes care of the OAuth2 authentication (`keyId` and `keySecret`), the rate-limit retries,
 * the timeout and the `User-Agent` header. The URL, query string, headers and body are sent as provided:
 * no path or query encoding, no field renaming, no pagination.
 *
 * Any response with a status >= 400 is thrown as an {@link ApiHttpError}.
 */
export class SinchHttpClient {

  /** @internal */
  public readonly lazyClient: LazyHttpApiClient;

  /**
   * @param {SinchClientParameters} params - `keyId` and `keySecret` are required unless `useSinchAuth` is false
   */
  constructor(params: SinchClientParameters) {
    this.lazyClient = new LazyHttpApiClient(resolveClientParameters(params));
  }

  /**
   * Send a GET request.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public get(url: string, params: HttpCallParameters = {}): Promise<HttpResponse> {
    return this.request(HttpMethod.GET, url, undefined, params);
  }

  /**
   * Send a DELETE request.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public delete(url: string, params: HttpCallParameters = {}): Promise<HttpResponse> {
    return this.request(HttpMethod.DELETE, url, undefined, params);
  }

  /**
   * Send a POST request.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpBody} body - Body sent untouched (e.g. a JSON string): set the `content-type` header accordingly
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public post(url: string, body: HttpBody, params: HttpCallParameters = {}): Promise<HttpResponse> {
    return this.request(HttpMethod.POST, url, toRequestBody(body), params);
  }

  /**
   * Send a POST request with a `multipart/form-data` body.
   * The `content-type` header (with its boundary) is set by the SDK.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpFormData} form - Form fields, as a `form-data` instance or a record. Streams are not supported.
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public async postFormData(url: string, form: HttpFormData, params: HttpCallParameters = {}): Promise<HttpResponse> {
    const formData = isFormData(form) ? form : buildFormData(form);
    let body: Buffer;
    try {
      // Buffer the form so the body can be replayed on retry
      body = formData.getBuffer();
    } catch (error: any) {
      throw new Error(`Unable to serialize the form data (streams are not supported): ${error.message}`);
    }
    const headers = toHttpHeaders(params.headers);
    headers.set('content-type', formData.getHeaders()['content-type']);
    return this.request(HttpMethod.POST, url, body, { ...params, headers });
  }

  /**
   * Send a PUT request.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpBody} body - Body sent untouched (e.g. a JSON string): set the `content-type` header accordingly
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public put(url: string, body: HttpBody, params: HttpCallParameters = {}): Promise<HttpResponse> {
    return this.request(HttpMethod.PUT, url, toRequestBody(body), params);
  }

  /**
   * Send a PATCH request.
   * @param {string} url - Absolute URL, without query parameters
   * @param {HttpBody} body - Body sent untouched (e.g. a JSON string): set the `content-type` header accordingly
   * @param {HttpCallParameters} [params] - Query string, headers and request-level options
   */
  public patch(url: string, body: HttpBody, params: HttpCallParameters = {}): Promise<HttpResponse> {
    return this.request(HttpMethod.PATCH, url, toRequestBody(body), params);
  }

  private async request(
    method: HttpMethod,
    url: string,
    body: RequestBody | undefined,
    params: HttpCallParameters,
  ): Promise<HttpResponse> {
    const apiClient = this.lazyClient.getApiClient();
    const { apiClientOptions } = apiClient;
    const options = params.options ?? {};
    const useSinchAuth = options.useSinchAuth ?? this.lazyClient.sharedConfig.useSinchAuth;
    const isOAuth2Plugin = (plugin: RequestPlugin) => plugin.getName() === RequestPluginEnum.OAUTH2_TOKEN_REQUEST;

    if (useSinchAuth && !(apiClientOptions.requestPlugins ?? []).some(isOAuth2Plugin)) {
      throw new Error(
        'Invalid configuration for the HTTP client: "useSinchAuth" requires "keyId" and "keySecret"'
        + ' to be set on the client',
      );
    }

    const timeoutSeconds = resolveTimeoutSeconds(options.timeoutSeconds ?? apiClientOptions.timeoutSeconds);
    const requestOptions = await apiClient.applyRequestPlugins(
      {
        method,
        headers: toFetchHeaders(toHttpHeaders(params.headers)),
        body,
        hostname: url,
        timeout: timeoutSeconds * 1000,
      },
      (plugin) => !useSinchAuth && isOAuth2Plugin(plugin),
    );

    return apiClient.processHttpCall(
      {
        url: `${url}${params.queryParams ?? ''}`,
        requestOptions,
        apiName: 'HTTP',
        operationId: method,
      },
      {
        retry: {
          retryPolicy: options.retryPolicy,
          maxRetryCount: options.maxRetryCount,
          exponentialBackoff: options.exponentialBackoff,
        },
        refreshExpiredToken: useSinchAuth,
      },
    );
  }
}

const toHttpHeaders = (headers?: HttpRequestHeaders): HttpHeaders => {
  const result = new HttpHeaders();
  if (!headers) {
    return result;
  }
  const entries = headers instanceof HttpHeaders ? headers.entries() : Object.entries(headers);
  for (const [name, value] of entries) {
    // Plain JS callers may pass undefined values: skip them as prepareOptions does
    const values = (Array.isArray(value) ? value : [value]).filter((entry) => entry !== undefined);
    if (values.length > 0) {
      result.append(name, values);
    }
  }
  return result;
};

const toRequestBody = (body: HttpBody): RequestBody => {
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    return body;
  }
  return Buffer.from(body.buffer, body.byteOffset, body.byteLength);
};

const isFormData = (form: HttpFormData): form is FormData =>
  typeof (form as FormData).getBuffer === 'function'
  && typeof (form as FormData).getHeaders === 'function';

const buildFormData = (fields: Record<string, string | Buffer>): FormData => {
  const formData = new FormData();
  for (const [name, value] of Object.entries(fields)) {
    formData.append(name, value);
  }
  return formData;
};
