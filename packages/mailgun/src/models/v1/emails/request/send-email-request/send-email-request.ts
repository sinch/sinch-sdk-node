import { TemplateProperties } from '../template-properties';
import { OverrideProperties } from '../override-properties';
import FormData = require('form-data');

export type MessageContentWhereHtmlContentCanBeInlineOnly = {
  /** Body of the message (HTML version) */
  html?: string;
  /** AMP part of the message.  Please follow Google guidelines to compose and send AMP emails */
  amp_html?: string;
  /** Body of the message (text version) */
  text?: string;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: never;
} & CommonEmailProperties;

export type MessageContentWhereHtmlContentCanBeFromTemplateOnly = {
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  /** AMP part of the message.  Please follow Google guidelines to compose and send AMP emails */
  amp_html?: string;
  /** Body of the message (text version) */
  text?: string;
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
  /** File attachment.  You can post multiple `attachment` values.  **Important:** You must use `multipart/form-data` encoding for sending attachments */
  attachment?: string;
  /** Attachment with `inline` disposition.  Can be used to send inline images (see example).  You can post multiple `inline` values */
  inline?: string;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  /** h: prefix followed by a Header/Value pair. For example: h:X-Mailgun-Sending-Ip-Pool=xx.xx.xxx.x. */
  [key: `h:${string}`]: string;
  /** `v:` prefix followed by an arbitrary name allows to attach a custom JSON data to the message.  See **Attaching Data to Messages** for more information */
  [key: `v:${string}`]: string | number;
}

export type SendEmailRequest = MessageContentWhereHtmlContentCanBeInlineOnly
  | MessageContentWhereHtmlContentCanBeFromTemplateOnly;

export const transformSendEmailRequestIntoApiRequestBody = (sdkRequest: SendEmailRequest): FormData => {
  const formData = new FormData();
  if ('html' in sdkRequest && sdkRequest['html'] !== undefined && sdkRequest['html'] !== null) {
    formData.append('html', sdkRequest['html']);
  }
  if ('template' in sdkRequest && sdkRequest['template'] !== undefined && sdkRequest['template'] !== null) {
    formData.append('template', sdkRequest['template']);
  }
  if (sdkRequest['amp_html'] !== undefined && sdkRequest['amp_html'] !== null) {
    formData.append('amp-html', sdkRequest['amp_html']);
  }
  if (sdkRequest['text'] !== undefined && sdkRequest['text'] !== null) {
    formData.append('text', sdkRequest['text']);
  }
  if (sdkRequest['to'] !== undefined && sdkRequest['to'] !== null) {
    formData.append('to', sdkRequest['to']);
  }
  if (sdkRequest['from'] !== undefined && sdkRequest['from'] !== null) {
    formData.append('from', sdkRequest['from']);
  }
  if (sdkRequest['cc'] !== undefined && sdkRequest['cc'] !== null) {
    formData.append('cc', sdkRequest['cc']);
  }
  if (sdkRequest['bcc'] !== undefined && sdkRequest['bcc'] !== null) {
    formData.append('bcc', sdkRequest['bcc']);
  }
  if (sdkRequest['subject'] !== undefined && sdkRequest['subject'] !== null) {
    formData.append('subject', sdkRequest['subject']);
  }
  if (sdkRequest['attachment'] !== undefined && sdkRequest['attachment'] !== null) {
    formData.append('attachment', sdkRequest['attachment']);
  }
  if (sdkRequest['inline'] !== undefined && sdkRequest['inline'] !== null) {
    formData.append('inline', sdkRequest['inline']);
  }
  if ('templateProperties' in sdkRequest
    && sdkRequest.templateProperties !== null
    && sdkRequest.templateProperties !== undefined) {
    const templateProperties = sdkRequest.templateProperties;
    if (templateProperties['text'] !== undefined && templateProperties['text'] !== null) {
      formData.append('t:text', templateProperties['text']);
    }
    if (templateProperties['version'] !== undefined && templateProperties['version'] !== null) {
      formData.append('t:version', templateProperties['version']);
    }
    if (templateProperties['variables'] !== undefined && templateProperties['variables'] !== null) {
      formData.append('t:variables', templateProperties['variables']);
    }
  }
  if (sdkRequest['overrideProperties'] !== undefined && sdkRequest['overrideProperties'] !== null) {
    const overrideProperties = sdkRequest['overrideProperties'];
    if (overrideProperties['tag'] !== undefined && overrideProperties['tag'] !== null) {
      formData.append('o:tag', overrideProperties['tag']);
    }
    if (overrideProperties['deliveryTimeOptimizePeriod'] !== undefined
      && overrideProperties['deliveryTimeOptimizePeriod'] !== null) {
      formData.append('o:deliverytime-optimize-period', overrideProperties['deliveryTimeOptimizePeriod']);
    }
    if (overrideProperties['enableDkimSignature'] !== undefined && overrideProperties['enableDkimSignature'] !== null) {
      formData.append('o:dkim', overrideProperties['enableDkimSignature']);
    }
    if (overrideProperties['secondaryDkim'] !== undefined && overrideProperties['secondaryDkim'] !== null) {
      formData.append('o:secondary-dkim', overrideProperties['secondaryDkim']);
    }
    if (overrideProperties['secondaryDkimPublic'] !== undefined && overrideProperties['secondaryDkimPublic'] !== null) {
      formData.append('o:secondary-dkim-public', overrideProperties['secondaryDkimPublic']);
    }
    if (overrideProperties['deliveryTime'] !== undefined && overrideProperties['deliveryTime'] !== null) {
      formData.append('o:deliverytime', overrideProperties['deliveryTime']);
    }
    if (overrideProperties['timeZoneLocalize'] !== undefined && overrideProperties['timeZoneLocalize'] !== null) {
      formData.append('o:time-zone-localize', overrideProperties['timeZoneLocalize']);
    }
    if (overrideProperties['tracking'] !== undefined && overrideProperties['tracking'] !== null) {
      formData.append('o:tracking', overrideProperties['tracking']);
    }
    if (overrideProperties['trackingClicks'] !== undefined && overrideProperties['trackingClicks'] !== null) {
      formData.append('o:tracking-clicks', overrideProperties['trackingClicks']);
    }
    if (overrideProperties['trackingOpens'] !== undefined && overrideProperties['trackingOpens'] !== null) {
      formData.append('o:tracking-opens', overrideProperties['trackingOpens']);
    }
    if (overrideProperties['trackingPixelLocationTop'] !== undefined
      && overrideProperties['trackingPixelLocationTop'] !== null) {
      formData.append('o:tracking-pixel-location-top', overrideProperties['trackingPixelLocationTop']);
    }
    if (overrideProperties['sendingIp'] !== undefined && overrideProperties['sendingIp'] !== null) {
      formData.append('o:sending-ip', overrideProperties['sendingIp']);
    }
    if (overrideProperties['sendingIpPool'] !== undefined && overrideProperties['sendingIpPool'] !== null) {
      formData.append('o:sending-ip-pool', overrideProperties['sendingIpPool']);
    }
    if (overrideProperties['requireTls'] !== undefined && overrideProperties['requireTls'] !== null) {
      formData.append('o:require-tls', overrideProperties['requireTls']);
    }
    if (overrideProperties['skipVerification'] !== undefined && overrideProperties['skipVerification'] !== null) {
      formData.append('o:skip-verification', overrideProperties['skipVerification']);
    }
    if (overrideProperties['isTestMode'] !== undefined && overrideProperties['isTestMode'] !== null) {
      formData.append('o:testmode', overrideProperties['isTestMode']);
    }
  }
  addPropertiesToFormData(sdkRequest, 'h:', formData);
  addPropertiesToFormData(sdkRequest, 'v:', formData);
  return formData;
};

const addPropertiesToFormData = (obj: SendEmailRequest, prefix: string, formData: FormData) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith(prefix) && !!value) {
      formData.append(key, value);
    }
  }
};
