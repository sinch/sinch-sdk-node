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
  choice_response_message: ChoiceResponseMessage;
  // Exclude other message types
  fallback_message?: never;
  location_message?: never;
  media_card_message?: never;
  media_message?: never;
  text_message?: never
}

interface ContactMessageFallbackMessage extends ContactMessageBase {
  /** @see FallbackMessage */
  fallback_message: FallbackMessage;
  // Exclude other message types
  choice_response_message?: never;
  location_message?: never;
  media_card_message?: never;
  media_message?: never;
  text_message?: never;
}

interface ContactMessageLocationMessage extends ContactMessageBase {
  /** @see LocationMessageItem */
  location_message: LocationMessageItem;
  // Exclude other message types
  choice_response_message?: never;
  fallback_message?: never;
  media_card_message?: never;
  media_message?: never;
  text_message?: never;
}

interface ContactMessageMediaCardMessage extends ContactMessageBase {
  /** @see MediaCardMessage */
  media_card_message: MediaCardMessage;
  // Exclude other message types
  choice_response_message?: never;
  fallback_message?: never;
  location_message?: never;
  media_message?: never;
  text_message?: never;
}

interface ContactMessageMediaMessage extends ContactMessageBase {
  /** @see MediaMessageItem */
  media_message: MediaMessageItem;
  // Exclude other message types
  choice_response_message?: never;
  fallback_message?: never;
  location_message?: never;
  media_card_message?: never;
  text_message?: never;
}

interface ContactMessageTextMessage extends ContactMessageBase {
  /** @see TextMessageItem */
  text_message: TextMessageItem;
  // Exclude other message types
  choice_response_message?: never;
  fallback_message?: never;
  location_message?: never;
  media_card_message?: never;
  media_message?: never;
}

interface ContactMessageBase {
  /** @see ReplyTo */
  reply_to?: ReplyTo;
}
