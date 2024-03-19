import { MediaBody } from '../media-body';
import { ParameterObj } from '../parameter-obj';
import { DeliveryReportEnum } from '../enums';

export interface MediaResponse {
  /** Unique identifier for batch */
  id?: string;
  /** List of Phone numbers and group IDs that will receive the batch. [More info](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628) */
  to?: string[];
  /** Sender number. Required if Automatic Default Originator not configured. */
  from?: string;
  /** Indicates if the batch has been canceled or not. */
  canceled?: boolean;
  /** @see MediaBody */
  body?: MediaBody;
  /** @see ParameterObj */
  parameters?: ParameterObj;
  /** Media message */
  type?: 'mt_media';
  /** Timestamp for when batch was created. YYYY-MM-DDThh:mm:ss.SSSZ format */
  created_at?: Date;
  /** Timestamp for when batch was last updated. YYYY-MM-DDThh:mm:ss.SSSZ format */
  modified_at?: Date;
  /** Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting.  */
  delivery_report?: DeliveryReportEnum;
  /** If set in the future the message will be delayed until send_at occurs.
   * Must be before `expire_at`. If set in the past messages will be sent immediately. YYYY-MM-DDThh:mm:ss.SSSZ format */
  send_at?: Date;
  /** If set the system will stop trying to deliver the message at this point.
   * Must be after `send_at`. Default and max is 3 days after send_at. YYYY-MM-DDThh:mm:ss.SSSZ format */
  expire_at?: Date;
  /** Override the default callback URL for this batch. Must be valid URL. */
  callback_url?: string;
  /** The client identifier of a batch message. If set, the identifier will be added in the delivery report/callback of this batch */
  client_reference?: string;
  /** If set to true then [feedback](/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** Whether or not you want the media included in your message to be checked against [Sinch MMS channel best practices](/docs/mms/bestpractices/). If set to true, your message will be rejected if it doesn't conform to the listed recommendations, otherwise no validation will be performed. */
  strict_validation?: boolean;
}
