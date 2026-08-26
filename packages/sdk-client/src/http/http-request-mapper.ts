import { ApiCallParameters } from '../api/api-client';
import { RequestOptions } from '../plugins/core/request-plugin';
import { HttpHeaders } from './http-headers';
import { resolveHttpMethod } from './http-method';
import { HttpRequest } from './http-request';

/**
 * Split a fully prepared URL into the path URL and the `?query` suffix.
 */
export const splitUrlAndQuery = (fullUrl: string): { url: string; queryParameters: string | null } => {
  const queryIndex = fullUrl.indexOf('?');
  if (queryIndex === -1) {
    return { url: fullUrl, queryParameters: null };
  }
  return {
    url: fullUrl.slice(0, queryIndex),
    queryParameters: fullUrl.slice(queryIndex),
  };
};

/**
 * Build an {@link HttpRequest} from existing {@link ApiCallParameters}.
 * @internal
 */
export function toHttpRequest(
  apiCallParameters: ApiCallParameters,
  requestOptions: RequestOptions = apiCallParameters.requestOptions,
): HttpRequest {
  const { url, queryParameters } = splitUrlAndQuery(apiCallParameters.url);
  return new HttpRequest({
    method: resolveHttpMethod(requestOptions.method),
    url,
    queryParameters,
    headers: HttpHeaders.fromFetchHeaders(requestOptions.headers),
    content: requestOptions.body ?? null,
  });
}
