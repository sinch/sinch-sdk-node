import { V2TemplateTranslation } from '../v2-template-translation';

export interface V2Template {

  /** The description of the template. */
  description?: string;
  /** The version of the template. While creating a template, this will be defaulted to 1. When updating a template, you must supply the latest version of the template in order for the update to be successful. */
  version?: number;
  /** The default translation to use if not specified. Specified as a BCP-47 `language_code` and the `language_code` must exist in the translations list. */
  default_translation?: string;
  /** List of V2TemplateTranslations */
  translations?: V2TemplateTranslation[];
  /** Timestamp when the template was created. */
  create_time?: Date;
  /** Timestamp when the template was updated. */
  update_time?: Date;
}
