import { Response } from 'node-fetch';
import { FetchHttpContentParser, HttpContentParser } from './http-content-parser';
import { HttpHeaders } from './http-headers';

/**
 * Wire-level HTTP response used by the SDK transport.
 * @internal
 */
export class HttpResponse {
  readonly status: number;
  readonly headers: HttpHeaders;
  readonly content: HttpContentParser;
  /** Native fetch response, kept for existing response plugins. */
  readonly nativeResponse: Response;

  constructor(nativeResponse: Response) {
    this.nativeResponse = nativeResponse;
    this.status = nativeResponse.status;
    this.headers = HttpHeaders.fromFetchHeaders(nativeResponse.headers);
    this.content = new FetchHttpContentParser(nativeResponse);
  }
}
