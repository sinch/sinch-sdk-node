import { CallDestination } from '../call-destination';
import { CallEvents } from '../call-events';
import { CallOrigin } from '../call-origin';

/**
 * Initiates a new outbound call leg within the current session.  This is a non-blocking command — the next command in the sequence executes immediately while the call is being established in parallel. Call lifecycle events (answer, busy, reject, timeout, hangup, failure) are handled via the `events` property.  The `from` and `to` endpoint types should ideally match. If they differ, the platform attempts to convert the `from` value to be compatible with the `to` type. For example, PSTN supports only E.164 phone numbers, so a SIP address such as `sip:46701234567@acme.se` can be converted to an E.164 number. If the `from` value cannot be converted, it defaults to null (anonymous).
 */
export interface DialCommand {
  /** Command to initiate a new call */
  command: CommandEnum;
  /** Identifier for this call leg within the session. Must be unique across all active call legs in the session.  Other commands (e.g., `hangup`) can reference this name to target this specific leg. */
  callName?: string;
  /** @see CallOrigin */
  from?: CallOrigin;
  /** @see CallDestination */
  to: CallDestination;
  /** Maximum time in seconds to wait for the call to be answered. If the timeout expires without an answer, the `onTimeout` event is triggered. */
  dialTimeoutDurationSeconds?: number;
  /** Maximum duration of the call in seconds. The call is terminated automatically when this limit is reached. */
  maxCallDurationSeconds?: number;
  /** @see CallEvents */
  events?: CallEvents;
}
export type CommandEnum = 'dial' | string;
/** Validation regex for callName */
export const callNamePattern = /^\S+$/;
