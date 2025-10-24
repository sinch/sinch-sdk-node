import { Choice } from '../choice';
import { CardHeight } from '../enums';
import { MediaProperties } from '../media-message';

/**
 * Field containing a Card Message.
 */
export interface CardMessage {
  /** Message containing text, media and choices. */
  card_message: CardMessageItem;
}

/**
 * Message containing text, media and choices.
 */
export interface CardMessageItem {
  /** You may include choices in your Card Message. The number of choices is limited to 10. */
  choices?: Choice[];
  /** This is an optional description field that is displayed below the title on the card. */
  description?: string;
  /** @see CardHeight */
  height?: CardHeight;
  /** A message containing a media component. */
  media_message?: MediaProperties;
  /** The title of the card message. */
  title?: string;
  /** Optional additional properties. */
  message_properties?: CardMessageItemProperties;
}

export interface CardMessageItemProperties {
  /** Optional. Sets the header for the footer of a WhatsApp reply button message, if there is no media in the message. Ignored for other channels. Ignored if not transcoded to a native WhatsApp message with reply buttons. */
  whatsapp_header?: string;
}
