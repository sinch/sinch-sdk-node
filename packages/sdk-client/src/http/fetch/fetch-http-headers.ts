import { Headers } from 'node-fetch';
import { HttpHeaders } from '../http-headers';

export function toFetchHeaders(headers: HttpHeaders): Headers {
  const fetchHeaders = new Headers();
  for (const [name, value] of headers.entries()) {
    fetchHeaders.append(name, value);
  }
  return fetchHeaders;
}

export function fromFetchHeaders(headers: Headers): HttpHeaders {
  const result = new HttpHeaders();
  const rawHeaders = getRawHeaderMap(headers);
  if (rawHeaders) {
    for (const [name, values] of Object.entries(rawHeaders)) {
      for (const value of values) {
        result.append(name, value);
      }
    }
    return result;
  }
  headers.forEach((value, name) => {
    result.append(name, value);
  });
  return result;
}

const getRawHeaderMap = (
  headers: Headers,
): Record<string, string[]> | undefined => {
  const withRaw = headers as Headers & { raw?: () => Record<string, string[]> };
  if (typeof withRaw.raw !== 'function') {
    return undefined;
  }
  return withRaw.raw();
};
