import { CallDestination } from '../call-destination';
import { CallOrigin } from '../call-origin';
import { Money } from '../money';

/**
 * Indicates the direction of the call.
 *
 * - `INBOUND`: A call initiated towards the Sinch Calling Platform.
 * - `OUTBOUND`: A call initiated from the Sinch Calling Platform.
 */
export type CallDirection = 'INBOUND' | 'OUTBOUND' | string;

/**
 * The type of channel used for the call. This value indicates what kind of endpoint the call is connected to.
 *
 * - `PHONE`: A call from or to the telephone network.
 * - `SIP`: A call from or to a SIP endpoint.
 * - `STREAM`: A call to a stream.
 * - `VOICE_RELAY`: A call to voice relay service.
 */
export type CallType = 'PHONE' | 'SIP' | 'STREAM' | 'VOICE_RELAY' | string;

/**
 * Indicates the origin/source of the call. This describes how the call was initiated.
 *
 * - `PHONE`: The call originated from the telephone network (PSTN).
 * - `SIP`: The call originated from a SIP trunk.
 * - `SERVER`: The call originated through the Sinch API.
 */
export type OriginationType = 'PHONE' | 'SIP' | 'SERVER' | string;

/**
 * The outcome/state of the call. Includes both transitional states (during call setup and execution) and final states (when the call has ended).
 *
 * - `QUEUED`: The call is queued for initiation. This is a transitional state.
 * - `INITIATED`: The call is connecting but the recipient has not yet answered. This is a transitional state.
 * - `IN_PROGRESS`: The call has been answered and is in progress. This is a transitional state.
 * - `COMPLETED`: The call was answered and is ended. This is a final state.
 * - `REJECTED`: The call was rejected by the recipient.
 * - `NO_ANSWER`: The call was not answered by the recipient.
 * - `CANCEL`: The call was cancelled.
 * - `BUSY`: The call was not answered because the recipient was busy.
 * - `FAILED`: The call could not be completed.
 */
export type CallResult
  = 'QUEUED' | 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
  | 'NO_ANSWER' | 'CANCEL' | 'BUSY' | 'FAILED' | string;

/**
 * Reason explaining why the call ended in the given `callResult`.
 *
 * - `OK`: The call was completed successfully.
 * - `NOT_AVAILABLE`: The callee was not available.
 * - `CALLER_HANGUP`: The caller hung up the call.
 * - `CALLEE_HANGUP`: The callee hung up the call.
 * - `MANAGER_HANGUP`: The call was ended by the call manager.
 * - `DID_NOT_FOUND`: The DID number was not found.
 * - `INVALID_SCRIPT`: The SVAML script was invalid.
 * - `UNKNOWN_PRODUCT`: The product associated with the call is unknown.
 * - `NO_MORE_ROUTES`: There are no more routes to complete the call.
 * - `ERROR`: An error occurred during the call.
 */
export type CallReason
  = 'OK' | 'NOT_AVAILABLE' | 'CALLER_HANGUP' | 'CALLEE_HANGUP' | 'MANAGER_HANGUP'
  | 'DID_NOT_FOUND' | 'INVALID_SCRIPT' | 'UNKNOWN_PRODUCT' | 'NO_MORE_ROUTES' | 'ERROR' | string;

/**
 * Call details for a single participant's connection in a session.
 */
export interface Call {
  /** The Id of the call. */
  callId: string;
  /** The Id of the project associated with the call. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** The ID of the session. */
  sessionId: string;
  /** @see CallDirection */
  direction: CallDirection;
  /** @see OriginationType */
  originationType: OriginationType;
  /** @see CallType */
  callType: CallType;
  /** @see CallResult */
  callResult: CallResult;
  /** Timestamp (RFC 3339) indicating when the call was created and call setup was initiated (start of the call attempt). */
  startTime: Date;
  /** The rate charged for this call, expressed as a monetary amount per minute in the specified currency. */
  callRate: Money;
  /** Absolute URI to this call resource. Use this URL to retrieve the call details. */
  callResourceUrl: string;
  /** The name of the bridge the call belongs to. Omitted for calls not assigned to any bridge. */
  bridgeName?: string;
  /** The ID of the batch, when the call was initiated as part of a batch operation. */
  batchId?: string;
  /** @see CallOrigin */
  from?: CallOrigin;
  /** @see CallDestination */
  to?: CallDestination;
  /** Timestamp (RFC 3339) indicating when the call was last updated. Omitted if no updates were performed on this call. */
  updateTime?: Date;
  /** Timestamp (RFC 3339) indicating when the call was answered. Omitted if the call was not answered. */
  answerTime?: Date;
  /** Timestamp (RFC 3339) indicating when the call ended. Omitted for ongoing calls. */
  endTime?: Date;
  /** Duration of the call in seconds. */
  callDurationSeconds?: number;
  /** @see CallReason */
  callReason?: CallReason;
}
