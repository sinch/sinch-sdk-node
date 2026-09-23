import { Say } from '../say';

/**
 * A text-to-speech (TTS) message item. The platform synthesizes the provided text into speech and plays it on the call.
 */
export interface SayMessage {
  /** Text-to-speech message to be played during the call. */
  type: TypeEnum;
  /** @see Say */
  say: Say;
}
export type TypeEnum = 'SAY' | string;
