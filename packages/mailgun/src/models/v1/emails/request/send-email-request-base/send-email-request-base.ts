import { OverrideProperties } from '../override-properties';
import { TemplateProperties } from '../template-properties';

export interface SendEmailRequestBase {
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to?: string;
  /** Email address for `From` header */
  from?: string;
  /** Same as `To` but for `Cc` */
  cc?: string;
  /** Same as `To` but for `Bcc` */
  bcc?: string;
  /** Message subject */
  subject?: string;
  /** File attachment.  You can post multiple `attachment` values.  **Important:** You must use `multipart/form-data` encoding for sending attachments */
  attachment?: string;
  /** Attachment with `inline` disposition.  Can be used to send inline images (see example).  You can post multiple `inline` values */
  inline?: string;
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
}
