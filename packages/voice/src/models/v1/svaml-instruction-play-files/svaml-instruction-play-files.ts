/**
 * Model: SvamlInstructionPlayFiles
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Plays Interactive Voice Response (IVR) files for the supported locale or SSML commands at the Sinch backend. An IVR message is played only on the caller's side.
 */
export interface SvamlInstructionPlayFiles {

  /** The `name` property. Must have the value `playFiles`. */
  name: 'playFiles';
  /** The IDs of the files which will be played. These can be a URL to a file, SSML commands using the `#ssml[]` element, or text using the `#tts[]` element. */
  ids: string[];
  /** If using SSML or TTS, this is a required field. The voice and language you want to use for the text-to-speech message. This can either be defined by the ISO 639 locale and language code or by specifying a particular voice. Supported languages and voices are detailed [here](../../voice-locales). */
  locale: string;
}


