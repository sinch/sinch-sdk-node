/**
 * Starts a recording of the call.
 */
export interface SvamlInstructionStartRecording {

  /** The `name` property. Must have the value `startRecording`. */
  name: 'startRecording';
  /** An object that specifies details about the recording. For more details, see [Recording Options](../../recording/#recording-options). */
  options?: StartRecordingOptions;
}

export interface StartRecordingOptions {
  /** Where the recording file should be stored. Sinch supports Amazon S3 and Microsoft Azure Blob Storage */
  destinationUrl: string;
  /** Specifies the information required for the Sinch platform to authenticate and/or authorize in the destination service in order to be able to store the file. */
  credentials: string;
  /** An optional property that specifies the format of the recording file. Default value is "mp3". */
  format?: string;
  /** An optional property that specifies if Sinch should send your backend events when the call recording is finished and when the file is available in the destination URL specified. Default value is “true” */
  notificationEvents?: boolean;
  /** */
  transcriptionOptions?: TranscriptionOptions;
}

export interface TranscriptionOptions {
  /** Enable / disable the transcription */
  enabled?: boolean;
  /** The locale of the transcription (e.g.: 'en-US') */
  locale?: TranscriptionLocale;
}

type TranscriptionLocale =
  'af-ZA'
  | 'ar-AE'
  | 'ar-SA'
  | 'zh-CN'
  | 'zh-TW'
  | 'da-DK'
  | 'nl-NL'
  | 'en-AU'
  | 'en-GB'
  | 'en-IN'
  | 'en-IE'
  | 'en-NZ'
  | 'en-AB'
  | 'en-ZA'
  | 'en-US'
  | 'en-WL'
  | 'fr-FR'
  | 'fr-CA'
  | 'fa-IR'
  | 'gd_GB'
  | 'de-DE'
  | 'de-CH'
  | 'he-IL'
  | 'hi-IN'
  | 'id-ID'
  | 'ga-IE'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'ms-MY'
  | 'pt-PT'
  | 'pt-BR'
  | 'ru-RU'
  | 'es-ES'
  | 'es-US'
  | 'sv-SE'
  | 'ta-IN'
  | 'te-IN'
  | 'th-TH'
  | 'tr-TR'
  | 'vi-VN';

export type StartRecordingProps = Omit<SvamlInstructionStartRecording, 'name'>;
