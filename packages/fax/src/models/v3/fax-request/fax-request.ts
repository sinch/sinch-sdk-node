import { ImageConversionMethod, WebhookContentType } from '../enums';
import { FaxContentUrl } from '../fax-content-url';
import { FaxBase64File } from '../fax-base64-file';

export type SingleFaxRequest = SingleFaxRequestJson | SingleFaxRequestFormData;

export type MultipleFaxRequest = MultipleFaxRequestJson | MultipleFaxRequestFormData;

export interface FaxRequestBase {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  from?: string;
  /**  */
  contentUrl?: FaxContentUrl;
  /** Text that will be displayed at the top of each page of the fax. 50 characters maximum. Default header text is "-". Note that the header is not applied until the fax is transmitted, so it will not appear on fax PDFs or thumbnails. */
  headerText?: string;
  /** If true, page numbers will be displayed in the header. Default is true. */
  headerPageNumbers?: boolean;
  /** A [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) string specifying the timezone for the header timestamp. */
  headerTimeZone?: string;
  /** The number of seconds to wait between retries if the fax is not yet completed. */
  retryDelaySeconds?: number;
  /** You can use this to attach labels to your call that you can use in your applications. It is a key value store. */
  labels?: { [key: string]: string; };
  /** The URL to which a callback will be sent when the fax is completed. The callback will be sent as a POST request with a JSON body. The callback will be sent to the URL specified in the `callbackUrl` parameter, if provided, otherwise it will be sent to the URL specified in the `callbackUrl` field of the Fax Service object. */
  callbackUrl?: string;
  /** The content type of the callback. */
  callbackUrlContentType?: WebhookContentType;
  /** Determines how documents are converted to black and white. Defaults to value selected on Fax Service object. */
  imageConversionMethod?: ImageConversionMethod;
  /** ID of the fax service used. */
  serviceId?: string;
  /** The number of times the fax will be retired before cancel. Default value is set in your fax service. The maximum number of retries is 5. */
  maxRetries?: number;
}

export type FaxRequestJson = FaxRequestBase & {
  /** An array of base64 encoded files */
  files: FaxBase64File[];
  filePaths?: never;
}

export type SingleFaxRequestJson = FaxRequestJson & {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  to: string;
}

export type MultipleFaxRequestJson = FaxRequestJson & {
  /** A list of phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  to: string[];
}

export interface FaxRequestFormData extends FaxRequestBase {
  /** The file(s) you want to send as a fax as body attachment. */
  filePaths?: string | string[];
  files?: never;
}

export type SingleFaxRequestFormData = FaxRequestFormData & {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  to: string;
}

export type MultipleFaxRequestFormData = FaxRequestFormData & {
  /** A list of phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  to: string[];
}
