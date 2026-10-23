/**
 * The request body for suspending a number.
 */
export interface SuspendNumberRequest {
  /** Set to `true` to suspend a number. */
  suspended?: boolean;
  /** An optional field to include a note providing context about the suspension. */
  note?: string;
}
