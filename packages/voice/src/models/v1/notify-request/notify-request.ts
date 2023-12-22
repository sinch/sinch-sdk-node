/**
 * Model: NotifyRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The request body of a Notify Event.
 */
export interface NotifyRequest {

  /** Must have the value `notify`. */
  event?: string;
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The current API version. */
  version?: number;
  /** The type of information communicated in the notification. */
  type?: string;
  /** An optional parameter containing notification-specific information. */
  custom?: string;
}


