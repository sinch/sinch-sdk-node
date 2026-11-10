import { HttpContentParser } from './http-content-parser';
import { HttpHeaders } from './http-headers';

/**
 * HTTP response: status, headers and a lazy parser over the body.
 */
export class HttpResponse {
  constructor(
    readonly status: number,
    readonly headers: HttpHeaders,
    readonly content: HttpContentParser,
  ) {}
}
