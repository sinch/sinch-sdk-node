/**
 * Stops a recording previously started by a `startRecording` command. This is a non-blocking command — execution continues to the next command in the sequence immediately after the stop is initiated.
 */
export interface StopRecordingCommand {
  /** Command to stop recording on the channel */
  command: 'stopRecording';
  /** Name of the recording to stop, as set by `recordingName` in the `startRecording` command. */
  recordingName: string;
}
/** Validation regex for recordingName */
export const recordingNamePattern = /^\S+$/;
