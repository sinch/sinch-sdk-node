import FormData = require('form-data');
import { HttpHeaders } from './http-headers';
import { HttpMethod } from './http-method';

/** @internal */
export type HttpContent = string | FormData | Buffer | null;

/** @internal */
export interface HttpRequestParams {
  method: HttpMethod;
  /** Absolute URL without query parameters */
  url: string;
  /** Pre-serialized query string including the leading `?`, or null */
  queryParameters?: string | null;
  headers?: HttpHeaders;
  content?: HttpContent;
}

/**
 * Wire-level HTTP request used by the SDK transport.
 * @internal
 */
export class HttpRequest {
  readonly method: HttpMethod;
  readonly url: string;
  readonly queryParameters: string | null;
  readonly headers: HttpHeaders;
  readonly content: HttpContent;

  constructor(params: HttpRequestParams) {
    this.method = params.method;
    this.url = params.url;
    this.queryParameters = params.queryParameters ?? null;
    this.headers = params.headers ?? new HttpHeaders();
    this.content = params.content ?? null;
  }
}
