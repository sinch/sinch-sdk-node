import { Agent } from '../agent';
import { LocationMessage, LocationMessageItem } from '../location-message';
import { MediaMessage, MediaMessageItem } from '../media-message';
import { TextMessage, TextMessageItem } from '../text-message';
import { TemplateMessage } from '../template-message';
import { CardMessage, CardMessageItem } from '../card-message';
import { ChoiceMessage } from '../choice-message';
import { CarouselMessage } from '../carousel-message';
import { ListMessage } from '../list-message';
import { ContactInfoMessage, ContactInfoMessageItem } from '../contact-info-message';

/**
 * Message originating from an app
 */
export type AppMessage =
  AppMessageCardMessage
  | AppMessageChoiceMessage
  | AppMessageLocationMessage
  | AppMessageCarouselMessage
  | AppMessageMediaMessage
  | AppMessageTemplateMessage
  | AppMessageTextMessage
  | AppMessageListMessage
  | AppMessageContactInfoMessage;

interface AppMessageCardMessage extends AppMessageBase {
  /** @see CardMessageItem */
  card_message?: CardMessageItem;
}

interface AppMessageChoiceMessage extends AppMessageBase {
  /** @see ChoiceResponseMessage */
  choice_message?: ChoiceMessage;
}

interface AppMessageLocationMessage extends AppMessageBase {
  /** @see LocationMessageItem */
  location_message?: LocationMessageItem;
}

interface AppMessageCarouselMessage extends AppMessageBase {
  /** @see CarouselMessage */
  carousel_message?: CarouselMessage;
}

interface AppMessageMediaMessage extends AppMessageBase {
  /** @see MediaMessageItem */
  media_message?: MediaMessageItem;
}

interface AppMessageTemplateMessage extends AppMessageBase {
  /** @see TemplateMessage */
  template_message?: TemplateMessage;
}

interface AppMessageTextMessage extends AppMessageBase {
  /** @see TextMessageItem */
  text_message?: TextMessageItem;
}

interface AppMessageListMessage extends AppMessageBase {
  /** @see ListMessage */
  list_message?: ListMessage;
}

interface AppMessageContactInfoMessage extends AppMessageBase {
  contact_info_message?: ContactInfoMessageItem;
}

interface AppMessageBase {
  /**
   * Optional. Channel specific messages, overriding any transcoding.
   * The key in the map must point to a valid conversation channel as defined by the enum ConversationChannel.
   */
  explicit_channel_message?: { [key: string]: string; };
  /**
   * The option to override the omni-channel template configuration with a channel-specific template
   * (for channels on which channel-specific templates can be created. For more information, see [Channel Specific Templates](https://developers.sinch.com/docs/conversation/templates/#channel-specific-templates)).
   */
  explicit_channel_omni_message?: { [key: string]: OmniMessageOverride; };
  /** Identity of a sender */
  agent?: Agent | null;
}

type OmniMessageOverride =
  CardMessage
  | CarouselMessage
  | ChoiceMessage
  | LocationMessage
  | MediaMessage
  | TemplateMessage
  | TextMessage
  | ListMessage
  | ContactInfoMessage;
