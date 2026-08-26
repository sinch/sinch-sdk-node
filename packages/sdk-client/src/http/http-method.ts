/** @internal */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const HTTP_METHODS = new Set<string>(Object.values(HttpMethod));

/** @internal */
export function resolveHttpMethod(method?: string): HttpMethod {
  const normalized = (method || HttpMethod.GET).toUpperCase();
  if (!HTTP_METHODS.has(normalized)) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return normalized as HttpMethod;
}
