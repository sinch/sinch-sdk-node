import { TemplateProperties } from '../template-properties';
import { OverrideProperties } from '../override-properties';

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

