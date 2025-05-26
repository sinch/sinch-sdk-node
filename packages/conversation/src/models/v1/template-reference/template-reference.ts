/**
 * The referenced template can be an omnichannel template stored in Conversation API Template Store as AppMessage or it can reference external channel-specific template such as WhatsApp Business Template.
 */
export interface TemplateReference {
  /** The BCP-47 language code, such as `en_US` or `sr_Latn`. For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. English is the default `language_code`. Note that, while many API calls involving templates accept either the dashed format (`en-US`) or the underscored format (`en_US`), some channel specific templates (for example, WhatsApp channel-specific templates) only accept the underscored format. Note that this field is required for WhatsApp channel-specific templates. */
  language_code?: string;
  /** Required if the template has parameters. Concrete values must be present for all defined parameters in the template. Parameters can be different for different versions and/or languages of the template. */
  parameters?: { [key: string]: string; };
  /** The ID of the template. Note that, in the case of WhatsApp channel-specific templates, this field must be populated by the name of the template. */
  template_id: string;
  /** Used to specify what version of a template to use. Required when using `omni_channel_override` and `omni_template` fields. This will be used in conjunction with `language_code`. Note that, when referencing omni-channel templates using the [Sinch Customer Dashboard](https://dashboard.sinch.com/), the latest version of a given omni-template can be identified by populating this field with `latest`. */
  version: string;
}


export interface ChannelSpecificTemplateReference {
  /** The BCP-47 language code, such as `en_US` or `sr_Latn`. For more information, see http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. English is the default `language_code`. Note that, while many API calls involving templates accept either the dashed format (`en-US`) or the underscored format (`en_US`), some channel specific templates (for example, WhatsApp channel-specific templates) only accept the underscored format. Note that this field is required for WhatsApp channel-specific templates. */
  language_code?: string;
  /** Required if the template has parameters. Concrete values must be present for all defined parameters in the template. Parameters can be different for different versions and/or languages of the template. */
  parameters?: { [key: string]: string; };
  /** The ID of the template. Note that, in the case of WhatsApp channel-specific templates, this field must be populated by the name of the template. */
  template_id: string;
  /** Used to specify what version of a template to use. This will be used in conjunction with `language_code`. */
  version?: string;
}
