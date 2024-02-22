/**
 * The request body of an Answered Call Event.
 */
export interface AceRequest {

  /** Must have the value `ace`. */
  event?: 'ace';
  /** The unique ID assigned to this call. */
  callid?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** If [Answering Machine Detection](/docs/voice/api-reference/amd_v2) (AMD) is enabled, this object contains information about whether the call was answered by a machine. */
  amd?: AnsweringMachineDetection;
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
}

export interface AnsweringMachineDetection {

  /** The determination by the system of who answered the call. */
  status?: string;
  /** The reason that the system used to determine who answered the call. */
  reason?: string;
  /** The length of the call. */
  duration?: number;
}
