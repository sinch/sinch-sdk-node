/**
 * The request body of a Notify Event.
 */
export interface NotifyRequest {

  /** Must have the value `notify`. */
  event?: 'notify';
  /** The unique ID assigned to this call. */
  callid?: string;
  /** The unique ID assigned to this conference. */
  conferenceId?: string;
  /** The current API version. */
  version?: number;
  /** The type of information communicated in the notification. */
  type?: 'recording_finished' | 'recording_available' | 'transcription_available' | string;
  /** An optional parameter containing notification-specific information. */
  custom?: string;
}
