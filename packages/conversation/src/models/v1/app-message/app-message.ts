import { Agent } from '../agent';
import { LocationMessage, LocationMessageItem } from '../location-message';
import { MediaMessage, MediaProperties } from '../media-message';
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
  /** @see MediaProperties */
  media_message: MediaProperties;
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
   * Allows you to specify a channel and define a corresponding channel specific message payload that will override the standard Conversation API message types.
   * The key in the map must point to a valid conversation channel as defined in the enum `ConversationChannel`. The message content must be provided in string format.
   * You may use the [transcoding endpoint](https://developers.sinch.com/docs/conversation/api-reference/conversation/tag/Transcoding/) to help create your message.
   * For more information about how to construct an explicit channel message for a particular channel, see that [channel's corresponding documentation](https://developers.sinch.com/docs/conversation/channel-support/) (for example, using explicit channel messages with [the WhatsApp channel](https://developers.sinch.com/docs/conversation/channel-support/whatsapp/message-support/#explicit-channel-messages)).
   */
  explicit_channel_message?: { [key in ConversationChannel ]?: string; };
  /**
   * Override the message's content for specified channels.
   * The key in the map must point to a valid conversation channel as defined in the enum `ConversationChannel`.
   * The content defined under the specified channel will be sent on that channel.
   */
  explicit_channel_omni_message?: { [key in ChannelSpecificTemplate]?: OmniMessageOverride; };
  /**
   * Channel specific messages, overriding any transcoding. The structure of this property is more well-defined than the open structure of the `explicit_channel_message` property, and may be easier to use.
   * The key in the map must point to a valid conversation channel as defined in the enum `ConversationChannel`.
   */
  channel_specific_message?: { [key in ConversationChannel]?: ChannelSpecificMessage; };
  /** Identity of a sender */
  agent?: Agent | null;
}

type ChannelSpecificTemplate = 'WHATSAPP' | 'KAKAOTALK' | 'WECHAT';

export type OmniMessageOverride =
  OmniMessageOverrideCardMessage
  | OmniMessageOverrideCarouselMessage
  | OmniMessageOverrideChoiceMessage
  | OmniMessageOverrideLocationMessage
  | OmniMessageOverrideMediaMessage
  | OmniMessageOverrideTemplateReference
  | OmniMessageOverrideTextMessage
  | OmniMessageOverrideListMessage
  | OmniMessageOverrideContactInfoMessage;

export interface OmniMessageOverrideCardMessage extends CardMessage {
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

export interface OmniMessageOverrideCarouselMessage extends CarouselMessage {
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

export interface OmniMessageOverrideChoiceMessage extends ChoiceMessage {
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

export interface OmniMessageOverrideLocationMessage extends LocationMessage {
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

export interface OmniMessageOverrideMediaMessage extends MediaMessage {
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

export interface OmniMessageOverrideTemplateReference {
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

export interface OmniMessageOverrideTextMessage extends TextMessage {
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

export interface OmniMessageOverrideListMessage extends ListMessage {
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

export interface OmniMessageOverrideContactInfoMessage extends ContactInfoMessage {
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
