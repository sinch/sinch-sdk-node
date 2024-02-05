import { AppMessageAdditionalProperties } from '../app-message-additional-properties';
import { AppMessageMessage } from '../app-message-message';
import { Agent } from '../agent';
import { LocationMessageItem } from '../location-message';
import { MediaMessageItem } from '../media-message';
import { TextMessageItem } from '../text-message';
import { TemplateMessage } from '../template-message';
import { CardMessageItem } from '../card-message';
import { ChoiceMessage } from '../choice-message';
import { CarouselMessage } from '../carousel-message';
import { ListMessage } from '../list-message';

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
  | AppMessageListMessage;

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

interface AppMessageBase {
  /** Optional. Channel specific messages, overriding any transcoding. The key in the map must point to a valid conversation channel as defined by the enum ConversationChannel. */
  explicit_channel_message?: { [key: string]: string; };
  /** @see AppMessageAdditionalProperties */
  additionalProperties?: AppMessageAdditionalProperties;
  /** Identity of a sender */
  agent?: Agent | null;
  /** */
  explicit_channel_omni_message?: { [key: string]: AppMessageMessage; };
}
