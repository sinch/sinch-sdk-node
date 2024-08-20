import { DeliveryReportStatusEnum } from '../../enums';

export interface GetDeliveryReportByBatchIdRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** The type of delivery report.  - A `summary` will count the number of messages sent per status.  - A `full` report give that of a `summary` report but in addition, lists phone numbers. */
  'type'?: 'summary' | 'full';
  /** Comma separated list of delivery_report_statuses to include */
  'status'?: DeliveryReportStatusEnum[];
  /** Comma separated list of delivery_receipt_error_codes to include */
  'code'?: string | number[];
}
export interface GetDeliveryReportByPhoneNumberRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** Phone number for which you to want to search. */
  'phone_number': string;
}
export interface ListDeliveryReportsRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page. */
  'page_size'?: number;
  /** Only list messages received at or after this date/time. Default: 24h ago */
  'start_date'?: Date;
  /** Only list messages received before this date/time. */
  'end_date'?: Date;
  /** Comma separated list of delivery report statuses to include. */
  'status'?: DeliveryReportStatusEnum[];
  /** Comma separated list of delivery receipt error codes to include. */
  'code'?: string;
  /** Client reference to include */
  'client_reference'?: string;
}
