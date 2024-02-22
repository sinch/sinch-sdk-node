import { Menu } from '../../menu';
import { TtsVoice } from '../../enums';

/**
 * Plays an interactive voice response (IVR) menu to the callee. This menu can play pre-recorded files or text-to-speech messages, collect DTMF tones, and trigger the [Prompt Input Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/pie) (PIE) callback towards your backend, notifying you of the actions the callee took. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback or an [Answered Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ace) callback. Also be used in combination with the [Conferences](/docs/voice/api-reference/voice/tag/Conferences/#tag/Conferences) endpoint of the Voice API.
 */
export interface SvamlActionRunMenu {

  /** The name property. Must have the value `runMenu`. */
  name: 'runMenu';
  /** 'Barging' means that the user can press a DTMF digit before the prompt has finished playing. If a valid input is pressed, the message will stop playing and accept the input. If `barge` is disabled, the user must listen to the entire prompt before input is accepted. By default, barging is enabled. */
  barge?: boolean;
  /** The voice and language you want to use for the text-to-speech message. This can either be defined by the ISO 639 locale and language code or by specifying a particular voice. Supported languages and voices are detailed [here](../../voice-locales). If using the `enableVoice` to enable voice detection, the `locale` property is required in order to select the input language. */
  locale?: TtsVoice;
  /** Selects the menu item from the `menus` array to play first. */
  mainMenu?: string;
  /** Enables voice detection. If enabled, users can say their answers to prompts in addition to entering them using the keypad. */
  enableVoice?: boolean;
  /** The list of menus available. The menu with the `id` value of `main` will always play first. If no menu has an `id` value of `main`, an error is returned. */
  menus?: Menu[];
}

export type RunMenuProps = Omit<SvamlActionRunMenu, 'name'>;
