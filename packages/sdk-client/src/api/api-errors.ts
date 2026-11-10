import { HttpResponse } from '../http/http-response';

/**
 * Generic error context
 */
export interface ErrorContext {
  /** Api name */
  apiName?: string;
  /** Operation ID */
  operationId?: string;
  /** Base URL */
  url?: string;
}

/**
 * Generic error class
 */
export class GenericError extends Error {
  constructor(message: string, errorContext: ErrorContext) {
    const baseUrl = GenericError.formatUrl(errorContext.url);
    super(
      `[apiName: ${errorContext.apiName || 'unknown'}]
        [operationId: ${errorContext.operationId || 'unknown'}] 
        [baseUrl: ${baseUrl}] [errorType: SDK] ${message}`,
    );
  }

  private static formatUrl(url: string | null | undefined) {
    const httpRegexp = /^https?:\/\//;
    return url ? url.replace(httpRegexp, '') : 'unknown';
  }

}

/**
 * Request failed error class
 */
export class RequestFailedError<T> extends GenericError {
  /**
   * Request status code
   */
  public statusCode: number;

  /**
   * Data decoded from the response body
   */
  public data?: string;

  /**
   * Response headers (lower-cased keys), captured at the moment of failure.
   */
  public responseHeaders?: { [key: string]: string };

  constructor(
    message: string,
    statusCode: number,
    errorContext: ErrorContext,
    data?: T,
    responseHeaders?: { [key: string]: string },
  ) {
    super(`[status: ${statusCode}] ${message}`, errorContext);
    this.statusCode = statusCode;
    this.data = JSON.stringify(data, null, 2);
    this.responseHeaders = responseHeaders;
  }
}

/**
 * Empty response error class
 */
/** @internal */
export class EmptyResponseError extends GenericError {

  constructor(message: string, errorContext: ErrorContext) {
    super(`[Empty response] ${message}`, errorContext);
  }
}

/**
 * Response parse error class
 */
/** @internal */
export class ResponseJSONParseError extends RequestFailedError<string> {
  constructor(
    message: string,
    httpStatus: number,
    errorContext: ErrorContext,
    bodyContent?: string,
  ) {
    super(
      `[Response JSON parse error] ${message}`,
      httpStatus,
      errorContext,
      bodyContent,
    );
  }
}

/**
 * Error thrown by the low-level HTTP client (`sinch.http`) when the response status is >= 400.
 * The response body is already buffered, so `response.content.asString()` / `asJson()` remain usable.
 */
export class ApiHttpError extends RequestFailedError<unknown> {
  /** The HTTP response that caused the error */
  public readonly response: HttpResponse;

  constructor(
    response: HttpResponse,
    errorContext: ErrorContext,
    data?: unknown,
  ) {
    const responseHeaders: { [key: string]: string } = {};
    for (const [name, value] of response.headers.entries()) {
      const key = name.toLowerCase();
      responseHeaders[key] = responseHeaders[key] ? `${responseHeaders[key]}, ${value}` : value;
    }
    super(`HTTP ${response.status}`, response.status, errorContext, data, responseHeaders);
    this.response = response;
  }
}
