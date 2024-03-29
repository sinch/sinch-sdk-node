export interface VerificationError {

  /** A summary of the HTTP error code and error type. */
  status?: string;
  /** The HTTP error code. */
  errorCode?: string;
  /** A simple description of the cause of the error. */
  message?: string;
  /** If applicable, a reference ID for support to use with diagnosing the error. */
  reference?: string;
}
