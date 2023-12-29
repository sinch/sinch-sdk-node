/**
 * Model: NotifyErrorRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The request body of Notify Event notifying of an error.
 */
export interface NotifyErrorRequest {

  /** Must have the value `notify`. */
  event?: string;
  /** The current API version. */
  version?: number;
  /** The type of information communicated in the notification. Must have the value `callingerror`. */
  type?: string;
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The error code of the error. */
  errorCode?: number;
  /** The error message of the error. */
  errorMsg?: string;
  /** The user ID that initiated the call. */
  user?: string;
  /** An optional parameter containing notification-specific information. */
  custom?: string;
}


