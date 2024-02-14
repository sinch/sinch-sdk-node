/**
 * The referenced template can be an omnichannel template stored in Conversation API Template Store as AppMessage or it can reference external channel-specific template such as WhatsApp Business Template.
 */
export interface TemplateReference {

  /** The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. English is the default language_code. */
  language_code?: string;
  /** Required if the template has parameters. Concrete values must be present for all defined parameters in the template. Parameters can be different for different versions and/or languages of the template. */
  parameters?: { [key: string]: string; };
  /** The ID of the template. */
  template_id: string;
  /** Used to specify what version of a template to use. This will be used in conjunction with `language_code`. */
  version: string;
}
