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
export class EmptyResponseError extends GenericError {

  constructor(message: string, errorContext: ErrorContext) {
    super(`[Empty response] ${message}`, errorContext);
  }
}

/**
 * Response parse error class
 */
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
