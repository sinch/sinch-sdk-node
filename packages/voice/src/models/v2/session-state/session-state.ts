/**
 * The state of the current session. Sessions can either be in a
 * "transitional" or "final" state. Sessions in a transitional state are
 * ongoing. Sessions in a final state will not send any more events.
 *
 * - `QUEUED`: The session is queued, no calls have been initiated for this session. This is a transitional state.
 * - `IN_PROGRESS`: At least one call has been initiated or received for this session. This is a transitional state.
 * - `COMPLETED`: The session was completed. This is a final state.
 * - `EXPIRED`: The call session was not initiated before the batch time-to-live (TTL) elapsed. This is a final state.
 */
export type SessionState = 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED' | string;
