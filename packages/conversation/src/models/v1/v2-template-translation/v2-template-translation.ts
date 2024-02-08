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

export type V2TemplateTranslation =
  V2TemplateTranslationCardMessage
  | V2TemplateTranslationChoiceMessage
  | V2TemplateTranslationCarouselMessage
  | V2TemplateTranslationListMessage
  | V2TemplateTranslationLocationMessage
  | V2TemplateTranslationMediaMessage
  | V2TemplateTranslationTemplateMessage
  | V2TemplateTranslationTextMessage;

export interface V2TemplateTranslationBase {

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

export type V2TemplateTranslationTextMessage = V2TemplateTranslationBase & TextMessage;
export type V2TemplateTranslationCardMessage = V2TemplateTranslationBase & CardMessage;
export type V2TemplateTranslationCarouselMessage = V2TemplateTranslationBase & CarouselMessage;
export type V2TemplateTranslationChoiceMessage = V2TemplateTranslationBase & ChoiceMessage;
export type V2TemplateTranslationLocationMessage = V2TemplateTranslationBase & LocationMessage;
export type V2TemplateTranslationMediaMessage = V2TemplateTranslationBase & MediaMessage;
export type V2TemplateTranslationTemplateMessage = V2TemplateTranslationBase & TemplateMessage;
export type V2TemplateTranslationListMessage = V2TemplateTranslationBase & ListMessage;
