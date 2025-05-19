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
  /** The results of the detection and/or the beep detection. */
  amd?: AmdStatus;
  /** The URL where the recording or transcription is available */
  destination?: string
}

type NotifyRequestType =
  'recording_finished'
  | 'recording_available'
  | 'transcription_available'
  | 'amd'
  | 'amd_beep'
  | string; // wildcard as there is no specification of the list of all notifications

interface AmdStatus {
  /** The status of the AMD. */
  status?: 'machine' | 'human' | string;
  /** The reason for the AMD status. */
  reason?: 'greeting' | 'beep' | 'n/a' | string;
  /** The duration of the amd processing. */
  duration?: number;
}
