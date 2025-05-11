import { DeliveryReceiptCodeEnum, DeliveryStatusEnum } from '../../enums';

export interface GetDeliveryReportByBatchIdRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /**
   * The type of delivery report.
   * - A `summary` will count the number of messages sent per status.
   * - A `full` report give that of a `summary` report but in addition, lists phone numbers.
   */
  'type'?: 'summary' | 'full';
  /** Comma separated list of delivery report statuses to include */
  'status'?: DeliveryStatusEnum | DeliveryStatusEnum[];
  /** Comma separated list of delivery receipt codes to include */
  // TODO V2: remove string type
  'code'?: string | DeliveryReceiptCodeEnum | DeliveryReceiptCodeEnum[];
}

export type GetDeliveryReportByPhoneNumberRequestData =
  GetDeliveryReportByPhoneNumberRequestDataBC | GetDeliveryReportByPhoneNumberRequestDataDeprecated;

export interface GetDeliveryReportByPhoneNumberRequestDataBC {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** Phone number for which you to want to search. */
  'phone_number': string;
  /** @deprecated Use phone_number instead */
  recipient_msisdn?: never;
}

export interface GetDeliveryReportByPhoneNumberRequestDataDeprecated {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** @deprecated: use phone_number instead */
  recipient_msisdn: string;
  /** Phone number for which you to want to search. */
  phone_number?: never;
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
  'status'?: DeliveryStatusEnum | DeliveryStatusEnum[];
  /** Comma separated list of delivery receipt codes to include. */
  // TODO V2: remove string type
  'code'?: string | DeliveryReceiptCodeEnum | DeliveryReceiptCodeEnum[];
  /** Client reference to include */
  'client_reference'?: string;
}
