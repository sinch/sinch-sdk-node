export interface ErrorResponse {
  /** The error status code. */
  status?: number;
  /** A short, human-readable summary of the error type. */
  title?: string;
  /** A human-readable explanation specific to this occurrence of the error. */
  detail?: string;
  /** A URI reference that identifies the error type. */
  type?: string;
}
