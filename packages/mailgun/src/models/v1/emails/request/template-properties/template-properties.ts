/**
 * Template\'s related properties.  Define template\'s related information & [variables](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/#template-variables)
 */
export interface TemplateProperties {
  /** Render template in case of template sending */
  text?: boolean;
  /** Render a specific version of the given template instead of the latest version. `o:template` option must also be provided. */
  version?: string;
  /** A valid JSON-encoded dictionary used as the input for template variable expansion.  See [Templates](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/#templates) for more information */
  variables?: Record<string, any>;
}
