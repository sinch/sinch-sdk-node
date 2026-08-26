import fetch, { RequestInit } from 'node-fetch';
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
export class HttpTransport {
  async send(request: HttpRequest, init?: HttpTransportSendInit): Promise<HttpResponse> {
    const url = `${request.url}${request.queryParameters ?? ''}`;
    const requestInit: RequestInit = {
      method: request.method,
      headers: request.headers.toFetchHeaders(),
      body: request.content ?? undefined,
      timeout: init?.timeout,
    };
    const response = await fetch(url, requestInit);
    return new HttpResponse(response);
  }
}
