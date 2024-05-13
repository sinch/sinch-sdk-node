import { DeliveryReportStatusEnum } from '../enums';

export interface RecipientDeliveryReport {

  /** The default originator used for the recipient this delivery report belongs to, if default originator pool configured and no originator set when submitting batch. */
  applied_originator?: string;
  /** A timestamp of when the Delivery Report was created in the Sinch service. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  at: Date;
  /** The ID of the batch this delivery report belongs to */
  batch_id: string;
  /** The client identifier of the batch this delivery report belongs to, if set when submitting batch. */
  client_reference?: string;
  /** The detailed status code. */
  code: number;
  /** Applied encoding for message. Present only if smart encoding is enabled. */
  encoding?: 'GSM' | 'UNICODE';
  /** The number of parts the message was split into. Present only if `max_number_of_message_parts` parameter was set. */
  number_of_message_parts?: number;
  /** The operator that was used for delivering the message to this recipient, if enabled on the account by Sinch. */
  operator?: string;
  /** A timestamp extracted from the Delivery Receipt from the originating SMSC. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  operator_status_at?: Date;
  /** Phone number that was queried. */
  recipient: string;
  /** The simplified status as described in _Delivery Report Statuses_. */
  status: DeliveryReportStatusEnum;
  /** The recipient delivery report type. */
  type: 'recipient_delivery_report_sms' | 'recipient_delivery_report_mms';
}
