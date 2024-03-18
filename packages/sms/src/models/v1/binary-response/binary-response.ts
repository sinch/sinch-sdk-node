import { DeliveryReportEnum } from '../enums';

export interface BinaryResponse {

  /** Unique identifier for batch. */
  id?: string;
  /** A list of phone numbers and group IDs that have received the batch. [More info](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628). */
  to?: string[];
  /** The sender number provided.  Required if the Automatic Default Originator is not configured. */
  from?: string;
  /** Indicates whether or not the batch has been canceled. */
  canceled?: boolean;
  /** The message content provided. Base64 encoded. */
  body?: string;
  /** The <a href=\"https://community.sinch.com/t5/Glossary/UDH-User-Data-Header/ta-p/7776\" target=\"_blank\">UDH</a> header of a binary message HEX encoded. Max 140 bytes including the `body`. */
  udh?: string;
  /** SMS in <a href=\"https://community.sinch.com/t5/Glossary/Binary-SMS/ta-p/7470\" target=\"_blank\">binary</a> format. */
  type?: 'mt_binary';
  /** Timestamp for when batch was created.   Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  created_at?: Date;
  /** Timestamp for when batch was last updated.   Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  modified_at?: Date;
  /** The delivery report callback option selected. Will be either `none`, `summary`, `full`, `per_recipient`, or `per_recipient_final`. */
  delivery_report?: DeliveryReportEnum;
  /** If set, the date and time the message should be delivered. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  send_at?: Date;
  /** If set, the date and time the message will expire. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601). For example: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  expire_at?: Date;
  /** The callback URL provided in the request. */
  callback_url?: string;
  /** The string input to identify this batch message. If set, the identifier will be added in the delivery report/callback of this batch. */
  client_reference?: string;
  /** If set to true, then [feedback](/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** If sent as a flash message, displays `true`. */
  flash_message?: boolean;
  /** If set to `true`, the message was shortened when exceeding one part. */
  truncate_concat?: boolean;
  /** Displays the number of message parts set in the request. */
  max_number_of_message_parts?: number;
  /** The type of number for the sender number. */
  from_ton?: number;
  /** Number Plan Indicator for the sender number. */
  from_npi?: number;
}
