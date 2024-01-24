import { Choice } from '../choice';
import { TextMessage } from '../text-message';

/**
 * Message containing choices/actions.
 */
export interface ChoiceMessage {

  /** Message containing choices/actions. */
  choice_message: ChoiceMessageItem;
}

export interface ChoiceMessageItem {

  /** The number of choices is limited to 10. */
  choices: Choice[];
  /** @see TextMessage */
  text_message?: TextMessage;
}
