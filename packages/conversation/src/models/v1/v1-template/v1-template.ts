import { TemplateChannel } from '../conversation-channel';
import { V1TemplateTranslation } from '../v1-template-translation';

export interface V1Template {

  /** @see TemplateChannel */
  channel?: TemplateChannel;
  /** Timestamp when the template was created. */
  create_time?: Date;
  /** The default translation to use if not specified. Specified as a BCP-47 `language_code` and the `language_code` must exist in the translations list. */
  default_translation?: string;
  /** The description of the template. */
  description?: string;
  /** The id of the template. Specify this yourself during creation otherwise we will generate an ID for you. This has to be unique for a given project. */
  id?: string;
  /** List of translations for the template. */
  translations?: V1TemplateTranslation[];
  /** Timestamp when the template was updated. */
  update_time?: Date;
}
