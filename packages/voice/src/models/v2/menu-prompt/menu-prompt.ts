import { Message } from '../message';

/**
 * Prompt configuration for menu playback, including prompt messages and barge-in behavior.
 */
export interface MenuPrompt {
  /** Controls whether input can interrupt prompt playback.  When enabled, playback stops as soon as input is detected and the input is evaluated immediately if matching conditions are met.  When disabled, input is still collected during playback and evaluated after playback finishes. */
  allowBargeIn?: boolean;
  /** Ordered list of messages to play. */
  messages: Message[];
}
