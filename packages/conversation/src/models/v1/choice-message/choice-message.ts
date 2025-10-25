import { TextMessageItem } from '../text-message';
import { Choice } from '../choice';

/**
 * A message containing choices.
 */
export interface ChoiceMessage {
  /** A message containing choices. */
  choice_message: ChoiceMessageItem;
}

export interface ChoiceMessageItem {
  /** The number of choices is limited to 10. */
  choices: Choice[];
  /** @see TextMessage */
  text_message?: TextMessageItem;
  /** Additional properties for the message. */
  message_properties?: ChoiceMessageItemProperties;
}

export interface ChoiceMessageItemProperties {
  /** Optional. Sets the text for the footer of a WhatsApp reply button or URL button message. Ignored for other channels. */
  whatsapp_footer?: string;
}
