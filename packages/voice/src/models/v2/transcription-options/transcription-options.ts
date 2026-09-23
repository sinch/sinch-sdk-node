/**
 * Configuration for automatic speech-to-text transcription of the recording.
 */
export interface TranscriptionOptions {
  /** If true, the recording will be transcribed to text. */
  isEnabled: boolean;
  /** Language code in BCP-47 format. */
  locale?: string;
}
