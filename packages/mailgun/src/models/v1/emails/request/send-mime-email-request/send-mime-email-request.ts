import { AttachedFileData } from '../email-attachment';
import { OverrideProperties } from '../override-properties';
import { TemplateProperties } from '../template-properties';

/**
 * Sending email message request.  Build a MIME string yourself using a MIME library for your programming language and submit it to Mailgun.
 */
export interface SendMimeEmailRequest {
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to: string | string[];
  /** MIME string of the message.  Make sure to use `multipart/form-data` content type to send this as a file upload */
  message: AttachedFileData;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  /** A valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables that can be referenced in the message body.  See **Batch Sending** for more information */
  recipientVariables?: { [key: string]: Record<string, string | number | boolean | Date> };
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  customVariables?: Record<string, string | number | boolean | Date>;
  customHeaders?: Record<string, string | number | boolean | Date>;
}
