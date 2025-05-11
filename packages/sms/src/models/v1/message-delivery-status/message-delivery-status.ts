import { DeliveryReceiptCodeEnum, DeliveryStatusEnum } from '../enums';

/**
 * Array with status objects. Only status codes with at least one recipient will be listed.
 */
export interface MessageDeliveryStatus {
  /** The detailed [status code](https://developers.sinch.com/docs/sms/api-reference/sms/tag/Delivery-reports/#tag/Delivery-reports/section/Delivery-report-error-codes). */
  code: DeliveryReceiptCodeEnum;
  /** The number of messages that currently has this code. */
  count: number;
  /** Only for `full` report. A list of the phone number recipients which messages has this status code. */
  recipients?: string[];
  /** The simplified status as described in _Delivery Report Statuses_. */
  status: DeliveryStatusEnum;
}
