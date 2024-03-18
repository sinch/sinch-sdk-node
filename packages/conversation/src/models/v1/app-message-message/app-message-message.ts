import { CardMessage } from '../card-message';
import { CarouselMessage } from '../carousel-message';
import { ChoiceMessage } from '../choice-message';
import { LocationMessage } from '../location-message';
import { MediaMessage } from '../media-message';
import { TextMessage } from '../text-message';
import { ListMessage } from '../list-message';
import { TemplateMessage } from '../template-message';
import { ContactInfoMessage } from '../contact-info-message';

/** The content of the message */
export type AppMessageMessage =
  AppMessageCardMessage
  | AppMessageCarouselMessage
  | AppMessageChoiceMessage
  | AppMessageLocationMessage
  | AppMessageMediaMessage
  | AppMessageTemplateMessage
  | AppMessageTextMessage
  | AppMessageListMessage
  | AppMessageContactInfoMessage;

interface AppMessageCardMessage extends CardMessage {
  // Exclude other message types
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageCarouselMessage extends CarouselMessage {
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageChoiceMessage extends ChoiceMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageLocationMessage extends LocationMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageMediaMessage extends MediaMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageTemplateMessage extends TemplateMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageTextMessage extends TextMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface AppMessageListMessage extends ListMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  contact_info_message?: never;
}

interface AppMessageContactInfoMessage extends ContactInfoMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
}
