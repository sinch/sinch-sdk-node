import { Call } from '../call';
import { SessionState } from '../session-state';

/**
 * A session represents the complete lifecycle of a voice interaction initiated through the Voice API.
 *
 * A session can contain one or more related call legs (for example, an original outbound call plus additional dials or transfers triggered by SVAML commands).
 * Use the `calls` array to inspect all call legs associated with the session and `state` to determine whether the session is still ongoing or has reached a final state.
 */
export interface Session {
  /** The ID of the session. */
  sessionId: string;
  /** The Id of the project associated with the call. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** Call legs associated with the session. */
  calls: Call[];
  /** Timestamp (RFC 3339) indicating when the session was created. */
  createTime: Date;
  /** @see SessionState */
  state: SessionState;
  /** Timestamp (RFC 3339) indicating when the session was last updated. Omitted if no updates were performed on this session. */
  updateTime?: Date;
  /** Timestamp (RFC 3339) indicating when the session ended. Omitted for ongoing sessions. */
  endTime?: Date;
}
