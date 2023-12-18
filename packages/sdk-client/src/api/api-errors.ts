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
  /** Origin domain initiating the call */
  origin?: string | null;
}

/**
 * Generic error class
 */
export class GenericError extends Error {
  constructor(message: string, errorContext: ErrorContext) {
    const baseUrl = GenericError.formatUrl(errorContext.url);
    const origin = GenericError.formatUrl(errorContext.origin);
    super(
      `[SDK] [apiName: ${errorContext.apiName || 'unknown'}]
        [operationId: ${errorContext.operationId || 'unknown'}] 
        [baseUrl: ${baseUrl}] [origin: ${origin}] [errorType: SDK] ${message}`,
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
  public data?: T;

  constructor(
    message: string,
    statusCode: number,
    errorContext: ErrorContext,
    data?: T,
  ) {
    super(`[status: ${statusCode}] ${message}`, errorContext);
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Empty response error class
 */
export class EmptyResponseError<T> extends GenericError {
  /**
   * Data decoded from the response body
   */
  public data?: T;

  constructor(message: string, errorContext: ErrorContext, data?: T) {
    super(`[Empty response] ${message}`, errorContext);
    this.data = data;
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
