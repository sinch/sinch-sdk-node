import { RecordingEvents } from '../recording-events';
import { RecordingOptions } from '../recording-options';

/**
 * Starts recording the call. This is a non-blocking command — execution continues to the next command in the sequence immediately after recording begins.
 */
export interface StartRecordingCommand {
  /** Command to start recording on the channel */
  command: CommandEnum;
  /** Identifier for this recording within the session. Must be unique across active recordings in the session.  Other commands (e.g., `stopRecording`) reference this name to target a specific recording.  Setting the recording name is useful for stopping the recording using the `stopRecording` command. If name is not set, recording can only be stopped when the call is disconnected. */
  recordingName?: string;
  /** @see RecordingOptions */
  recordingOptions: RecordingOptions;
  /** @see RecordingEvents */
  events?: RecordingEvents;
}
export type CommandEnum = 'startRecording' | string;
/** Validation regex for recordingName */
export const recordingNamePattern = /^\S+$/;
