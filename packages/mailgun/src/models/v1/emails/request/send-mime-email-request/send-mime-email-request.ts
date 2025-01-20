import { OverrideProperties } from '../override-properties';
import { TemplateProperties } from '../template-properties';

export interface SendMimeEmailRequest {
  /** Email address of the recipient(s).  Example: `\"Bob <bob@host.com>\"`. You can use commas to separate multiple recipients */
  to: string | string[];
  /** MIME string of the message.  Make sure to use `multipart/form-data` content type to send this as a file upload */
  message: string | Blob | Buffer | NodeJS.ReadableStream;
  /** Name of a template stored via template API to use to render the email body.  See **Templates** for more information */
  template?: string;
  recipientVariables?: { [key: string]: Record<string, string | number | boolean | Date> };
  /** @see TemplateProperties */
  templateProperties?: TemplateProperties;
  /** @see OverrideProperties */
  overrideProperties?: OverrideProperties;
  /** List of  */
  customVariables?: Record<string, string | number | boolean | Date>;
  /** List of  */
  customHeaders?: Record<string, string | number | boolean | Date>;
}
