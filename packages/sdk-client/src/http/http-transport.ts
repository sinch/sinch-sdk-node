import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';

/** @internal */
export interface HttpTransportSendInit {
  timeout?: number;
}

/**
 * Thin HTTP transport: one round-trip, no auth or retry.
 * @internal
 */
export interface HttpTransport {
  send(request: HttpRequest, init?: HttpTransportSendInit): Promise<HttpResponse>;
  /** Release unused response resources so sockets can be reused. */
  release(response: HttpResponse): void;
}
