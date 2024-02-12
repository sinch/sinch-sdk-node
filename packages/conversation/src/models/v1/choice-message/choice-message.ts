import { TextMessageItem } from '../text-message';
import { Choice } from '../choice';

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
  text_message?: TextMessageItem;
}
