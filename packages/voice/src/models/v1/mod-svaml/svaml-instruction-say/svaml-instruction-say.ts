/**
 * Plays a synthesized text-to-speech message to the end user. The message is provided in the text field.
 */
export interface SvamlInstructionSay {

  /** The `name` property. Must have the value `say`. */
  name: 'say';
  /** Contains the message that will be spoken. Default maximum length is 600 characters. To change this limit, please contact support. */
  text?: string;
  /** The voice and language you want to use for the text-to-speech message. This can either be defined by the ISO 639 locale and language code or by specifying a particular voice. Supported languages and voices are detailed [here](../../voice-locales). */
  locale?: string;
}
