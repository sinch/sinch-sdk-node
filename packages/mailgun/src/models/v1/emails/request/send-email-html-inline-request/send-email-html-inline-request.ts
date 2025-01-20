import { OverrideProperties } from '../override-properties';
import { EmailAttachment } from '../email-attachment';

export interface SendEmailHtmlInlineRequest {
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
  /** A valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables that can be referenced in the message body. See <strong>Batch Sending</strong> for more information */
  recipientVariables?: {
    [key: string]: Record<string, string | number | boolean | Date>;
  };
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  /** List of  */
  customVariables?: Record<string, string | number | boolean | Date>;
  /** List of  */
  customHeaders?: Record<string, string | number | boolean | Date>;
  /** Body of the message (HTML version) */
  html?: string;
}
