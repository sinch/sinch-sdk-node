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
export type ContactMessage =
  ContactMessageChoiceResponseMessage
  | ContactMessageFallbackMessage
  | ContactMessageLocationMessage
  | ContactMessageMediaCardMessage
  | ContactMessageMediaMessage
  | ContactMessageTextMessage;

interface ContactMessageChoiceResponseMessage extends ContactMessageBase {
  /** @see ChoiceResponseMessage */
  choice_response_message?: ChoiceResponseMessage;
}

interface ContactMessageFallbackMessage extends ContactMessageBase {
  /** @see FallbackMessage */
  fallback_message?: FallbackMessage;
}

interface ContactMessageLocationMessage extends ContactMessageBase {
  /** @see LocationMessageItem */
  location_message?: LocationMessageItem;
}

interface ContactMessageMediaCardMessage extends ContactMessageBase {
  /** @see MediaCardMessage */
  media_card_message?: MediaCardMessage;
}

interface ContactMessageMediaMessage extends ContactMessageBase {
  /** @see MediaMessageItem */
  media_message?: MediaMessageItem;
}

interface ContactMessageTextMessage extends ContactMessageBase {
  /** @see TextMessageItem */
  text_message?: TextMessageItem;
}

interface ContactMessageBase {
  /** @see ReplyTo */
  reply_to?: ReplyTo;
}
