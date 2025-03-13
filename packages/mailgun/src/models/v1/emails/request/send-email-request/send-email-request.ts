import { TemplateProperties } from '../template-properties';
import { OverrideProperties } from '../override-properties';


export type MessageContentWithHtmlInline = {
  /** Body of the message (HTML version) */
  html?: string;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: never;
  /** @see TemplateProperties */
  templateProperties?: never;
} & CommonEmailProperties;

export type MessageContentWithHtmlInTemplate = {
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  /** Body of the message (HTML version) */
  html?: never;
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
} & CommonEmailProperties;

export interface CommonEmailProperties {
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to: string;
  /** Email address for `From` header */
  from: string;
  /** Same as `To` but for `Cc` */
  cc?: string;
  /** Same as `To` but for `Bcc` */
  bcc?: string;
  /** Message subject */
  subject: string;
  /** Body of the message (text version) */
  text?: string;
  /** AMP part of the message.  Please follow Google guidelines to compose and send AMP emails */
  ampHtml?: string;
  /** File attachment.  You can post multiple `attachment` values.  **Important:** You must use `multipart/form-data` encoding for sending attachments */
  attachment?: string;
  /** Attachment with `inline` disposition.  Can be used to send inline images (see example).  You can post multiple `inline` values */
  inline?: string;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  /** h: prefix followed by a Header/Value pair. For example: h:X-Mailgun-Sending-Ip-Pool=xx.xx.xxx.x. */
  [key: `h:${string}`]: string;
  /** `v:` prefix followed by an arbitrary name allows to attach a custom JSON data to the message.  See **Attaching Data to Messages** for more information */
  [key: `v:${string}`]: string | number | Date;
}

export type SendEmailRequest = MessageContentWithHtmlInline
  | MessageContentWithHtmlInTemplate;
