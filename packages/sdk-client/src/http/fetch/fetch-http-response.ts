import { Response } from 'node-fetch';
import { HttpResponse } from '../http-response';
import { FetchHttpContentParser } from './fetch-http-content-parser';
import { fromFetchHeaders } from './fetch-http-headers';

export function toHttpResponse(nativeResponse: Response): HttpResponse {
  return new HttpResponse(
    nativeResponse.status,
    fromFetchHeaders(nativeResponse.headers),
    new FetchHttpContentParser(nativeResponse),
  );
}
