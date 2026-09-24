import { Play } from '../play';

/**
 * An audio file playback message item. The platform fetches and plays the audio file at the provided URL on the call.
 */
export interface PlayMessage {
  /** Audio file playback during the call. */
  type: TypeEnum;
  /** @see Play */
  play: Play;
}
export type TypeEnum = 'PLAY' | string;
