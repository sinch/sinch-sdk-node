import { CardMessageItem } from '../card-message';
import { Choice } from '../choice';

/**
 * Message containing a list of cards often rendered horizontally on supported channels. Supported types for media are only images, such as .png, .jpg, .jpeg extensions.
 */
export interface CarouselMessage {
  /** Message containing a list of cards often rendered horizontally on supported channels. Supported types for media are only images, such as .png, .jpg, .jpeg extensions. */
  carousel_message: CarouselMessageItem;
}

export interface CarouselMessageItem {
  /** A list of up to 10 cards. */
  cards: CardMessageItem[];
  /** Optional. Outer choices on the carousel level. The number of outer choices is limited to 3. */
  choices?: Choice[];
}
