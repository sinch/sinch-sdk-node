import { RecordingDestinationType } from '../recording-destination-type';
import { RecordingFormatType } from '../recording-format-type';
import { RecordingType } from '../recording-type';
import { TranscriptionOptions } from '../transcription-options';

/**
 * Recording options for this recording.
 */
export interface RecordingOptions {
  /** @see RecordingFormatType */
  format?: RecordingFormatType;
  /** @see RecordingType */
  recordingType?: RecordingType;
  /** @see RecordingDestinationType */
  destination: RecordingDestinationType;
  /** Destination URL for the recording. */
  destinationUrl: string;
  /** Credentials to third party storage. */
  credentials: string;
  /** @see TranscriptionOptions */
  transcriptionOptions?: TranscriptionOptions;
}
