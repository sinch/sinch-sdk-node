import { SvamlCommand } from '../svaml-command';

/**
 * SVAML commands to execute based on recording lifecycle outcomes.
 */
export interface RecordingEvents {
  /** Commands to execute when the recording is successfully stopped. Note that this does not mean that the file is delivered to the configured destination yet.  */
  onFinish?: SvamlCommand[];
  /** Commands to execute if the recording fails to start. If omitted, failures are silently ignored and the call flow continues.  */
  onFailure?: SvamlCommand[];
}
