/**
 * Model: Menu
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { Option } from '../option';

/**
 * An IVR menu that contains an audio prompt as well as configured options.
 */
export interface Menu {

  /** The identifier of a menu. One menu must have the ID value of `main`. */
  id: string;
  /** The main voice prompt that the user hears when the menu starts the first time.  You can use text-to-speech using the `#tts[]` element, SSML commands using the `#ssml[]` element, pre-recorded messages, or URL references to external media resources. You can use multiple prompts by separating each prompt with a semi-colon (`;`). If multiple prompts are used, they will be played in the order they are specified, without any pauses between playback. For external media resources, you can use an `#href[...]` or directly specify the full URL. Check the [Supported audio formats](/docs/voice/api-reference/supported-audio-formats) section for more information. */
  mainPrompt?: string;
  /** The prompt that will be played if valid or expected DTMF digits are not entered.  You can use text-to-speech using the `#tts[]` element, SSML commands using the `#ssml[]` element, pre-recorded messages, or URL references to external media resources. You can use multiple prompts by separating each prompt with a semi-colon (`;`). If multiple prompts are used, they will be played in the order they are specified, without any pauses between playback. For external media resources, you can use an `#href[...]` or directly specify the full URL. Check the [Supported audio formats](/docs/voice/api-reference/supported-audio-formats) section for more information. */
  repeatPrompt?: string;
  /** The number of times that the `repeatPrompt` is played. */
  repeats?: number;
  /** The maximum number of digits expected for a user to enter. Once these digits are collected, a [Prompt Input Event (PIE)](../../voice/tag/Callbacks/#tag/Callbacks/operation/pie) is triggered containing these digits. */
  maxDigits?: number;
  /** Determines silence for the purposes of collecting a DTMF or voice response in milliseconds. If the timeout is reached, the response is considered completed and will be submitted. */
  timeoutMills?: number;
  /** Sets a limit for the maximum amount of time allowed to collect voice input. */
  maxTimeoutMills?: number;
  /** The set of options available in the menu. */
  options?: Option[];
}


