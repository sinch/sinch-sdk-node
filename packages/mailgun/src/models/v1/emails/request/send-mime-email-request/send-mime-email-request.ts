import { TemplateProperties } from '../template-properties';
import { OverrideProperties } from '../override-properties';
import FormData = require('form-data');

export interface SendMimeEmailRequest {
  /** MIME string of the message.  Make sure to use `multipart/form-data` content type to send this as a file upload */
  message: string | Blob | Buffer | NodeJS.ReadableStream;
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to: string;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  /** A valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables that can be referenced in the message body.  See **Batch Sending** for more information */
  recipientVariables?: string;
  /** h: prefix followed by a Header/Value pair. For example: h:X-Mailgun-Sending-Ip-Pool=xx.xx.xxx.x. */
  [key: `h:${string}`]: string;
  /** `v:` prefix followed by an arbitrary name allows to attach a custom JSON data to the message.  See **Attaching Data to Messages** for more information */
  [key: `v:${string}`]: string | number;
}

export const transformSendMimeEmailRequestIntoApiRequestBody = (sdkRequest: SendMimeEmailRequest): FormData => {
  const formData = new FormData();
  if (sdkRequest['to'] !== undefined && sdkRequest['to'] !== null) {
    formData.append('to', sdkRequest['to']);
  }
  if ('message' in sdkRequest && sdkRequest['message'] !== undefined && sdkRequest['template'] !== null) {
    formData.append('message', sdkRequest['message'], {
      filename: 'MimeMessage',
    });
  }
  if ('template' in sdkRequest && sdkRequest['template'] !== undefined && sdkRequest['template'] !== null) {
    formData.append('template', sdkRequest['template']);
  }
  if (sdkRequest['templateProperties'] !== undefined && sdkRequest['templateProperties'] !== null) {
    const templateProperties = sdkRequest['templateProperties'];
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

const addPropertiesToFormData = (obj: SendMimeEmailRequest, prefix: string, formData: FormData) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith(prefix) && !!value) {
      formData.append(key, value);
    }
  }
};
