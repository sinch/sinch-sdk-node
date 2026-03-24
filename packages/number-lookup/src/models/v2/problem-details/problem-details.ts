export interface ProblemDetails {
  /** A URI reference that identifies the problem type. */
  type?: string;
  /** A short, human-readable summary of the problem type. */
  title?: string;
  /** The HTTP status code. */
  status?: number;
  /** The identifier for a trace. */
  traceId?: string;
}
