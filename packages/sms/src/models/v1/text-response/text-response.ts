/**
 * Model: TextResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ParameterObj } from '../parameter-obj';
import { DeliveryReportEnum } from '../enums';

export interface TextResponse {

  /** Unique identifier for batch */
  id?: string;
  /** List of Phone numbers and group IDs that will receive the batch. [More info](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628) */
  to?: string[];
  /** Sender number. Must be valid phone number, short code or alphanumeric. Required if Automatic Default Originator not configured. */
  from?: string;
  /** Indicates if the batch has been canceled or not. */
  canceled?: boolean;
  /** @see ParameterObj */
  parameters?: ParameterObj;
  /** The message content */
  body?: string;
  /** Regular SMS */
  type?: TypeEnum;
  /** Timestamp for when batch was created. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601):`YYYY-MM-DDThh:mm:ss.SSSZ`. */
  created_at?: Date;
  /** Timestamp for when batch was last updated. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601):`YYYY-MM-DDThh:mm:ss.SSSZ`. */
  modified_at?: Date;
  /** Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting.  */
  delivery_report?: DeliveryReportEnum;
  /** If set in the future, the message will be delayed until `send_at` occurs. Must be before `expire_at`. If set in the past, messages will be sent immediately. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  send_at?: Date;
  /** If set, the system will stop trying to deliver the message at this point. Must be after `send_at`. Default and max is 3 days after `send_at`. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  expire_at?: Date;
  /** Override the default callback URL for this batch. Must be valid URL. */
  callback_url?: string;
  /** The client identifier of a batch message. If set, the identifier will be added in the delivery report/callback of this batch */
  client_reference?: string;
  /** If set to `true`, then [feedback](/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** Shows message on screen without user interaction while not saving the message to the inbox. */
  flash_message?: boolean;
  /** If set to `true` the message will be shortened when exceeding one part. */
  truncate_concat?: boolean;
  /** Message will be dispatched only if it is not split to more parts than Max Number of Message Parts */
  max_number_of_message_parts?: number;
  /** The type of number for the sender number. Use to override the automatic detection. */
  from_ton?: number;
  /** Number Plan Indicator for the sender number. Use to override the automatic detection. */
  from_npi?: number;
}

export type TypeEnum = 'mt_text' | 'mt_binary' | 'mt_media';

