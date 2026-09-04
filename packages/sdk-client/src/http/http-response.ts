import { HttpContentParser } from './http-content-parser';
import { HttpHeaders } from './http-headers';

/**
 * Wire-level HTTP response used by the SDK transport.
 * @internal
 */
export class HttpResponse {
  constructor(
    readonly status: number,
    readonly headers: HttpHeaders,
    readonly content: HttpContentParser,
  ) {}
}
