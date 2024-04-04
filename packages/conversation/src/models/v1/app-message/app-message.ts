import { Agent } from '../agent';
import { LocationMessage, LocationMessageItem } from '../location-message';
import { MediaMessage, MediaMessageItem } from '../media-message';
import { TextMessage, TextMessageItem } from '../text-message';
import { TemplateMessageItem } from '../template-message';
import { TemplateReference } from '../template-reference';
import { CardMessage, CardMessageItem } from '../card-message';
import { ChoiceMessage, ChoiceMessageItem } from '../choice-message';
import { CarouselMessage, CarouselMessageItem } from '../carousel-message';
import { ListMessage, ListMessageItem } from '../list-message';
import { ContactInfoMessage, ContactInfoMessageItem } from '../contact-info-message';
import { ConversationChannel } from '../conversation-channel';
import { ChannelSpecificMessage } from '../channel-specific-message';

/**
 * Message originating from an app
 */
export type AppMessage =
  AppCardMessage
  | AppChoiceMessage
  | AppLocationMessage
  | AppCarouselMessage
  | AppMediaMessage
  | AppTemplateMessage
  | AppTextMessage
  | AppListMessage
  | AppContactInfoMessage;

export interface AppCardMessage extends AppMessageBase {
  /** @see CardMessageItem */
  card_message: CardMessageItem;
  // Exclude other message types
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppChoiceMessage extends AppMessageBase {
  /** @see ChoiceMessageItem */
  choice_message: ChoiceMessageItem;
  // Exclude other message types
  card_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppLocationMessage extends AppMessageBase {
  /** @see LocationMessageItem */
  location_message: LocationMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppCarouselMessage extends AppMessageBase {
  /** @see CarouselMessageItem */
  carousel_message: CarouselMessageItem;
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

export interface AppMediaMessage extends AppMessageBase {
  /** @see MediaMessageItem */
  media_message: MediaMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppTemplateMessage extends AppMessageBase {
  /** @see TemplateMessageItem */
  template_message: TemplateMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppTextMessage extends AppMessageBase {
  /** @see TextMessageItem */
  text_message: TextMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

export interface AppListMessage extends AppMessageBase {
  /** @see ListMessageItem */
  list_message: ListMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  contact_info_message?: never;
}

export interface AppContactInfoMessage extends AppMessageBase {
  /** @see ContactInfoMessageItem */
  contact_info_message: ContactInfoMessageItem;
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  carousel_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
  list_message?: never;
}

interface AppMessageBase {
  /**
   * Channel specific messages, overriding any transcoding.
   * The key in the map must point to a valid conversation channel as defined by the enum ConversationChannel.
   */
  explicit_channel_message?: { [key in ConversationChannel ]?: string; };
  /**
   * The option to override the omni-channel template configuration with a channel-specific template
   * (for channels on which channel-specific templates can be created. For more information, see [Channel Specific Templates](https://developers.sinch.com/docs/conversation/templates/#channel-specific-templates)).
   */
  explicit_channel_omni_message?: { [key in ChannelSpecificTemplate]?: OmniMessage; };
  /**
   * Channel specific messages, overriding any transcoding. The structure of this property is more well-defined than the open structure of the `explicit_channel_message` property, and may be easier to use.
   * The key in the map must point to a valid conversation channel as defined in the enum `ConversationChannel`.
   */
  channel_specific_message?: { [key in ConversationChannel]?: ChannelSpecificMessage; };
  /** Identity of a sender */
  agent?: Agent | null;
}

type ChannelSpecificTemplate = 'WHATSAPP' | 'KAKAOTALK' | 'WECHAT';

export type OmniMessage =
  OmniCardMessage
  | OmniCarouselMessage
  | OmniChoiceMessage
  | OmniLocationMessage
  | OmniMediaMessage
  | OmniTemplateMessage
  | OmniTextMessage
  | OmniListMessage
  | OmniContactInfoMessage;

interface OmniCardMessage extends CardMessage {
  // Exclude other message types
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniCarouselMessage extends CarouselMessage {
  // Exclude other message types
  card_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniChoiceMessage extends ChoiceMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniLocationMessage extends LocationMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniMediaMessage extends MediaMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniTemplateMessage {
  /** @see TemplateReference */
  template_reference: TemplateReference;
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

interface OmniTextMessage extends TextMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  list_message?: never;
  contact_info_message?: never;
}

interface OmniListMessage extends ListMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  contact_info_message?: never;
}

interface OmniContactInfoMessage extends ContactInfoMessage {
  // Exclude other message types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_reference?: never;
  text_message?: never;
  list_message?: never;
}
