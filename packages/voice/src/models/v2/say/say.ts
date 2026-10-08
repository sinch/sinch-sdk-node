import { VoiceName } from '../voice-name';

export interface Say {
  /** The text to be synthesized into speech.  If `format` is `TEXT` (default), provide plain text. If `format` is `SSML`, provide a valid SSML document (for example, `<speak>...</speak>`). */
  text: string;
  /** Format of the message */
  format?: FormatEnum;
  /** The name of the voice to use for text-to-speech synthesis. */
  voiceName: VoiceName;
}
export type FormatEnum = 'TEXT' | 'SSML' | string;
