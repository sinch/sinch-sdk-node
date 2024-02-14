import { TemplateVariable } from '../template-variable';

export interface V1TemplateTranslation {

  /** This is the definition of the template with the language specified in the language_code field. */
  content?: string;
  /** Timestamp when the translation was created. */
  create_time?: Date;
  /** The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  language_code?: string;
  /** Timestamp of when the translation was updated. */
  update_time?: Date;
  /** List of expected variables. Can be used for request validation. */
  variables?: TemplateVariable[];
  /** The version of template. */
  version?: string;
}
