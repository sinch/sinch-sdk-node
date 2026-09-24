export interface Say {
  /** The text to be synthesized into speech.  If `format` is `TEXT` (default), provide plain text. If `format` is `SSML`, provide a valid SSML document (for example, `<speak>...</speak>`). */
  text: string;
  /** Format of the message */
  format?: FormatEnum;
  /** The name of the voice to use for text-to-speech synthesis.  Supported voices include: Emma, Brian, and others. For a complete list of available voices and their characteristics, see the [Text-to-Speech Voices documentation](/docs/voice/api-reference/text-to-speech-voices). */
  voiceName: string;
}
export type FormatEnum = 'TEXT' | 'SSML' | string;
