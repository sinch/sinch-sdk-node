import { appendTemplatePropertiesToFormData, TemplateProperties } from '../template-properties';
import { appendOverridePropertiesToFormData, OverrideProperties } from '../override-properties';
import { appendFilteredPropertiesToFormData } from '../helper';
import FormData = require('form-data');

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
  amp_html?: string;
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

export const transformSendEmailRequestIntoApiRequestBody = (sdkRequest: SendEmailRequest): FormData => {
  const formData = new FormData();
  if (sdkRequest['html'] != null) {
    formData.append('html', sdkRequest['html']);
  }
  if (sdkRequest['amp_html'] != null) {
    formData.append('amp-html', sdkRequest['amp_html']);
  }
  if (sdkRequest['text'] != null) {
    formData.append('text', sdkRequest['text']);
  }
  if (sdkRequest['to'] != null) {
    formData.append('to', sdkRequest['to']);
  }
  if (sdkRequest['from'] != null) {
    formData.append('from', sdkRequest['from']);
  }
  if (sdkRequest['cc'] != null) {
    formData.append('cc', sdkRequest['cc']);
  }
  if (sdkRequest['bcc'] != null) {
    formData.append('bcc', sdkRequest['bcc']);
  }
  if (sdkRequest['subject'] != null) {
    formData.append('subject', sdkRequest['subject']);
  }
  if (sdkRequest['attachment'] != null) {
    formData.append('attachment', sdkRequest['attachment']);
  }
  if (sdkRequest['inline'] != null) {
    formData.append('inline', sdkRequest['inline']);
  }
  if (sdkRequest.overrideProperties != null) {
    appendOverridePropertiesToFormData(sdkRequest.overrideProperties, formData);
  }
  if (sdkRequest['template'] != null) {
    formData.append('template', sdkRequest['template']);
  }
  if (sdkRequest.templateProperties != null) {
    appendTemplatePropertiesToFormData(sdkRequest.templateProperties, formData);
  }
  appendFilteredPropertiesToFormData(sdkRequest, 'h:', formData);
  appendFilteredPropertiesToFormData(sdkRequest, 'v:', formData);
  return formData;
};
