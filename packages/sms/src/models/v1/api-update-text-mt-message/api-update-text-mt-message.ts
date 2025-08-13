import { ParameterGroup } from '../parameter-group';
import { DeliveryReportEnum } from '../enums';

export interface ApiUpdateTextMtMessage {
  /** Sender number. Must be valid phone number, short code or alphanumeric. */
  from?: string;
  /** Regular SMS */
  type?: 'mt_text';
  /** List of phone numbers and group IDs to add to the batch. */
  to_add?: string[];
  /** List of phone numbers and group IDs to remove from the batch. */
  to_remove?: string[];
  /** Request delivery report callback.     Note that delivery reports can be fetched from the API regardless of this setting.  */
  delivery_report?: DeliveryReportEnum;
  /** If set, in the future the message will be delayed until `send_at` occurs. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`.  Constraints: Must be before expire_at. If set in the past, messages will be sent immediately.  */
  send_at?: Date;
  /** If set, the system will stop trying to deliver the message at this point.
   * Must be after `send_at`. Default and max is 3 days after `send_at`. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  expire_at?: Date;
  /** Override the default callback URL for this batch.  Constraints: Must be valid URL.  */
  callback_url?: string;
  /** The client identifier of a batch message. If set, the identifier will be added in the delivery report/callback of this batch */
  client_reference?: string;
  /** If set to `true`, then [feedback](https://developers.sinch.com/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/deliveryFeedback) is expected after successful delivery. */
  feedback_enabled?: boolean;
  /** @see ParameterGroup */
  parameters?: ParameterGroup;
  /** The message content */
  body?: string;
  /** The type of number for the sender number. Use to override the automatic detection. */
  from_ton?: number;
  /** Number Plan Indicator for the sender number. Use to override the automatic detection. */
  from_npi?: number;
  /** Message will be dispatched only if it is not split to more parts than Max Number of Message Parts */
  max_number_of_message_parts?: number;
  /** If set to `true` the message will be shortened when exceeding one part. */
  truncate_concat?: boolean;
  /** Shows message on screen without user interaction while not saving the message to the inbox. */
  flash_message?: boolean;
}
