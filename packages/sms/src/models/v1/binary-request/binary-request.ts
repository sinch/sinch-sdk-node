import { DeliveryReportEnum } from '../enums';

export interface BinaryRequest {
  /** A list of phone numbers and group IDs that will receive the batch. [More info](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628). */
  to: string[];
  /** Sender number. Must be valid phone number, short code or alphanumeric. Required if Automatic Default Originator not configured. */
  from?: string;
  /** The message content Base64 encoded.   Max 140 bytes including `udh`. */
  body: string;
  /** The UDH header of a binary message HEX encoded. Max 140 bytes including the `body`. */
  udh: string;
  /** SMS in [binary](https://community.sinch.com/t5/Glossary/Binary-SMS/ta-p/7470) format. */
  type?: 'mt_binary';
  /** Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting.  */
  delivery_report?: DeliveryReportEnum;
  /** If set in the future the message will be delayed until `send_at` occurs.
   * Must be before `expire_at`. If set in the past, messages will be sent immediately. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  send_at?: Date;
  /** If set, the system will stop trying to deliver the message at this point.
   * Must be after `send_at`. Default and max is 3 days after `send_at`. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  expire_at?: Date;
  /** Override the *default* callback URL for this batch. Must be a valid URL. Learn how to set a default callback URL <a href=\"https://community.sinch.com/t5/SMS/How-do-I-assign-a-callback-URL-to-an-SMS-service-plan/ta-p/8414\" target=\"_blank\">here</a>. */
  callback_url?: string;
  /** The client identifier of a batch message. If set, the identifier will be added in the delivery report/callback of this batch. */
  client_reference?: string;
  /** If set to true then [feedback](https://developers.sinch.com/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** The type of number for the sender number. Use to override the automatic detection. */
  from_ton?: number;
  /** Number Plan Indicator for the sender number. Use to override the automatic detection. */
  from_npi?: number;
}
