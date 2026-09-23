import fetch, { RequestInit, Response } from 'node-fetch';
import { HttpRequest } from '../http-request';
import { HttpResponse } from '../http-response';
import { HttpTransport, HttpTransportSendInit } from '../http-transport';
import { toFetchHeaders } from './fetch-http-headers';
import { toHttpResponse } from './fetch-http-response';

/** @internal */
export class FetchHttpTransport implements HttpTransport {
  private readonly nativeResponses = new WeakMap<HttpResponse, Response>();

  async send(request: HttpRequest, init?: HttpTransportSendInit): Promise<HttpResponse> {
    const url = `${request.url}${request.queryParameters ?? ''}`;
    const requestInit: RequestInit = {
      method: request.method,
      headers: toFetchHeaders(request.headers),
      body: request.content ?? undefined,
      timeout: init?.timeout,
    };
    const response = await fetch(url, requestInit);
    const httpResponse = toHttpResponse(response);
    this.nativeResponses.set(httpResponse, response);
    return httpResponse;
  }

  release(response: HttpResponse): void {
    const native = this.nativeResponses.get(response);
    const body = native?.body as { destroy?: () => void } | null | undefined;
    if (body && typeof body.destroy === 'function') {
      body.destroy();
    }
  }

  getNativeResponse(response: HttpResponse): Response {
    const native = this.nativeResponses.get(response);
    if (!native) {
      throw new Error('Native fetch response is not available for this HttpResponse');
    }
    return native;
  }
}
