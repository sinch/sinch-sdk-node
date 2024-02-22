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
  type?: NotifyRequestType;
  /** An optional parameter containing notification-specific information. */
  custom?: string;
  /** The details about the 'amd' or 'amd_beep' event type */
  amd?: AmdStatus;
}

type NotifyRequestType =
  'recording_finished'
  | 'recording_available'
  | 'transcription_available'
  | 'amd'
  | 'amd_beep'
  | string; // wildcard as there is no specification of the list of all notifications

interface AmdStatus {
  /** */
  status?: 'machine' | 'human' | string;
  /** */
  reason?: 'greeting' | 'beep' | 'n/a' | string;
  /** */
  duration?: number;
}
