import { ChannelTemplateOverride } from '../channel-template-override';
import { TemplateVariable } from '../template-variable';
import { TextMessage } from '../text-message';
import { CardMessage } from '../card-message';
import { CarouselMessage } from '../carousel-message';
import { ChoiceMessage } from '../choice-message';
import { LocationMessage } from '../location-message';
import { MediaMessage } from '../media-message';
import { TemplateMessage } from '../template-message';
import { ListMessage } from '../list-message';
import { ContactInfoMessage } from '../contact-info-message';

export type V2TemplateTranslation =
  V2TemplateTranslationCardMessage
  | V2TemplateTranslationChoiceMessage
  | V2TemplateTranslationCarouselMessage
  | V2TemplateTranslationListMessage
  | V2TemplateTranslationLocationMessage
  | V2TemplateTranslationMediaMessage
  | V2TemplateTranslationTemplateMessage
  | V2TemplateTranslationTextMessage
  | V2TemplateTranslationContactInfoMessage;

 interface V2TemplateTranslationBase {
  /** The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  language_code: string;
  /** The version of the translation. */
  version?: string;
  /** @see ChannelTemplateOverride */
  channel_template_overrides?: ChannelTemplateOverride;
  /** List of expected variables. Can be used for request validation. */
  variables?: TemplateVariable[];
  /** Timestamp when the translation was created. */
  create_time?: Date;
  /** Timestamp of when the translation was updated. */
  update_time?: Date;
}

interface V2TemplateTranslationCardMessage extends V2TemplateTranslationBase, CardMessage {
  // Exclude other template translation types
  carousel_message?: never;
  choice_message?: never;
  list_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationCarouselMessage extends V2TemplateTranslationBase, CarouselMessage {
  // Exclude other template translation types
  card_message?: never;
  choice_message?: never;
  list_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationChoiceMessage extends V2TemplateTranslationBase, ChoiceMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  list_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationListMessage extends V2TemplateTranslationBase, ListMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationLocationMessage extends V2TemplateTranslationBase, LocationMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  list_message?: never;
  media_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationMediaMessage extends V2TemplateTranslationBase, MediaMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  list_message?: never;
  location_message?: never;
  template_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationTemplateMessage extends V2TemplateTranslationBase, TemplateMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  list_message?: never;
  location_message?: never;
  media_message?: never;
  text_message?: never;
}
interface V2TemplateTranslationTextMessage extends V2TemplateTranslationBase, TextMessage {
  // Exclude other template translation types
  card_message?: never;
  carousel_message?: never;
  choice_message?: never;
  list_message?: never;
  location_message?: never;
  media_message?: never;
  template_message?: never;
}
