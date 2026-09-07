import { SessionState } from '../session-state';

/**
 * Identifier and current execution state of a call session within a batch.
 */
export interface BatchSessionSummary {
  /** Unique identifier of the call session within the batch. This identifies the session, not an individual call. Use it with `/v2/projects/{projectId}/sessions/{sessionId}` to retrieve full session details. */
  id?: string;
  /** @see SessionState */
  state?: SessionState;
}

/**
 * Detailed per-session view of a batch call operation. Contains one entry for each call session in the batch, including the session identifier and its current execution state.
 */
export interface BatchDetails {
  /** Per-session details for the batch. `EXPIRED` sessions are never returned because they were never initiated. */
  sessions: BatchSessionSummary[];
}
