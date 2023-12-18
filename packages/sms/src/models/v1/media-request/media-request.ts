/**
 * Model: MediaRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { MediaBody } from '../media-body';
import { ParameterObj } from '../parameter-obj';
import { DeliveryReportEnum } from '../enums';

/**
 * Only available in the US. Contact support if you wish to send MMS.
 */
export interface MediaRequest {

  /** List of Phone numbers and group IDs that will receive the batch. <a href=\"https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628\" target=\"_blank\">More info</a> */
  to: string[];
  /** Sender number. Must be valid phone number, short code or alphanumeric. Required if Automatic Default Originator not configured. */
  from?: string;
  /** @see MediaBody */
  body: MediaBody;
  /** @see ParameterObj */
  parameters?: ParameterObj;
  /** MMS */
  type?: TypeEnum;
  /** Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting. */
  delivery_report?: DeliveryReportEnum;
  /** If set in the future, the message will be delayed until `send_at` occurs. Must be before `expire_at`. If set in the past, messages will be sent immediately. Formatted as <a href=\"https://en.wikipedia.org/wiki/ISO_8601\" target=\"_blank\">ISO-8601</a>: `YYYY-MM-DDThh:mm:ss.SSSZ`.  */
  send_at?: Date;
  /** If set, the system will stop trying to deliver the message at this point. Must be after `send_at`. Default and max is 3 days after `send_at`. Formatted as <a href=\"https://en.wikipedia.org/wiki/ISO_8601\" target=\"_blank\">ISO-8601</a>: `YYYY-MM-DDThh:mm:ss.SSSZ`.  */
  expire_at?: Date;
  /** Override the default callback URL for this batch. Must be valid URL. */
  callback_url?: string;
  /** The client identifier of a batch message. If set, the identifier will be added in the delivery report/callback of this batch */
  client_reference?: string;
  /** If set to `true`, then [feedback](/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** Whether or not you want the media included in your message to be checked against [Sinch MMS channel best practices](/docs/mms/bestpractices/). If set to true, your message will be rejected if it doesn\'t conform to the listed recommendations, otherwise no validation will be performed.  */
  strict_validation?: boolean;
}

export type TypeEnum = 'mt_media';

