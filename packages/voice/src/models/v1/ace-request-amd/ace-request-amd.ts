/**
 * Model: AceRequestAmd
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * If [Answering Machine Detection](/docs/voice/api-reference/amd_v2) (AMD) is enabled, this object contains information about whether the call was answered by a machine.
 */
export interface AceRequestAmd {

  /** The determination by the system of who answered the call. */
  status?: string;
  /** The reason that the system used to determine who answered the call. */
  reason?: string;
  /** The length of the call. */
  duration?: number;
}


