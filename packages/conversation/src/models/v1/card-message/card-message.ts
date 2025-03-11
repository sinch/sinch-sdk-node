import { Choice } from '../choice';
import { CardHeight } from '../enums';
import { MediaProperties } from '../media-message';

/**
 * Message containing text, media and choices.
 */
export interface CardMessage {
  /** Message containing text, media and choices. */
  card_message: CardMessageItem;
}

export interface CardMessageItem {
  /** You may include choices in your Card Message. The number of choices is limited to 10. */
  choices?: Choice[];
  /** This is an optional description field that is displayed below the title on the card. */
  description?: string;
  /** @see CardHeight */
  height?: CardHeight;
  /** @see MediaProperties */
  media_message?: MediaProperties;
  /** The title of the card message. */
  title?: string;
}
