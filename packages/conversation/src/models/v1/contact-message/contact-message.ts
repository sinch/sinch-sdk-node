import { ChoiceResponseMessage } from '../choice-response-message';
import { FallbackMessage } from '../fallback-message';
import { LocationMessageItem } from '../location-message';
import { MediaCardMessage } from '../media-card-message';
import { MediaMessageItem } from '../media-message';
import { ReplyTo } from '../reply-to';
import { TextMessageItem } from '../text-message';

/**
 * Message originating from a contact
 */
export interface ContactMessage {

  /** @see ChoiceResponseMessage */
  choice_response_message?: ChoiceResponseMessage;
  /** @see FallbackMessage */
  fallback_message?: FallbackMessage;
  /** @see LocationMessage */
  location_message?: LocationMessageItem;
  /** @see MediaCardMessage */
  media_card_message?: MediaCardMessage;
  /** @see MediaMessage */
  media_message?: MediaMessageItem;
  /** @see ReplyTo */
  reply_to?: ReplyTo;
  /** @see TextMessageItem */
  text_message?: TextMessageItem;
}
