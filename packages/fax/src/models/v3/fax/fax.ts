import { BarCode } from '../bar-code';
import { FaxContentUrl } from '../fax-content-url';
import { FaxMoney } from '../fax-money';
import { ErrorType, FaxDirection, FaxStatus, ImageConversionMethod, WebhookContentType } from '../enums';

export interface Fax {

  /** The id of a fax */
  id?: string;
  /** @see FaxDirection */
  direction?: FaxDirection;
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  from?: string;
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  to?: string;
  /** @see FaxContentUrl */
  contentUrl?: FaxContentUrl;
  /** The number of pages in the fax. */
  numberOfPages?: number;
  /** @see FaxStatus */
  status?: FaxStatus;
  /** The total price for this fax. This field is populated after the final fax price is calculated. */
  price?: FaxMoney;
  /** The bar codes found in the fax. This field is populated when sinch detects bar codes on incoming faxes. */
  barCodes?: BarCode[];
  /** A timestamp representing the time when the initial API call was made. */
  createTime?: Date;
  /** If the job is complete, this is a timestamp representing the time the job was completed. */
  completedTime?: Date;
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
  callbackContentType?: WebhookContentType;
  /** Determines how documents are converted to black and white. Defaults to value selected on Fax Service object. */
  imageConversionMethod?: ImageConversionMethod;
  /** @see ErrorType */
  errorType?: ErrorType;
  /** One of the error numbers listed in the [Fax Error Messages section](#FaxErrors). */
  errorId?: number;
  /** One of the error codes listed in the [Fax Error Messages section](#FaxErrors). */
  errorCode?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** ID of the fax service used. */
  serviceId?: string;
  /** The number of times the fax will be retired before cancel. Default value is set in your fax service. The maximum number of retries is 5. */
  maxRetries?: number;
  /** The number of times the fax has been retried. */
  retryCount?: number;
  /** Only shown on the fax result. This indicates if the content of the fax is stored with Sinch. (true or false) */
  hasFile?: string;
}
