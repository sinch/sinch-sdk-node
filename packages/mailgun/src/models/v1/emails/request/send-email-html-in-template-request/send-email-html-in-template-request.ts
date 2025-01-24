import { EmailAttachment } from '../email-attachment';
import { OverrideProperties } from '../override-properties';
import { TemplateProperties } from '../template-properties';

/**
 * Sending email message request.  Use to send with HTML content built from template.  See [Templates](https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/#templates)
 */
export interface SendEmailHtmlInTemplateRequest {
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to: string | string[];
  /** Email address for `From` header */
  from: string;
  /** Same as `To` but for `Cc` */
  cc?: string | string[];
  /** Same as `To` but for `Bcc` */
  bcc?: string | string[];
  /** Message subject */
  subject: string;
  /** Body of the message (text version) */
  text?: string;
  /** AMP part of the message.  Please follow Google guidelines to compose and send AMP emails */
  ampHtml?: string;
  /** File attachment.  You can post multiple `attachment` values.  **Important:** You must use `multipart/form-data` encoding for sending attachments */
  attachment?: EmailAttachment;
  /** Attachment with `inline` disposition.  Can be used to send inline images (see example).  You can post multiple `inline` values */
  inline?: EmailAttachment;
  /** A valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables that can be referenced in the message body.  See **Batch Sending** for more information */
  recipientVariables?: { [key: string]: Record<string, string | number | boolean | Date> };
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  customVariables?: Record<string, string | number | boolean | Date>;
  customHeaders?: Record<string, string | number | boolean | Date>;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
}
