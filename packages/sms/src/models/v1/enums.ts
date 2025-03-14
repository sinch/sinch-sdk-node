/**
 * Kind of delivery report
 */
export type DeliveryReportEnum =
  'none'
  | 'summary'
  | 'full'
  | 'per_recipient'
  | 'per_recipient_final'
  | string;

/**
 * The simplified status as described in _Delivery Report Statuses_.
 */
export type DeliveryStatusEnum =
  'Queued'
  | 'Dispatched'
  | 'Aborted'
  | 'Cancelled'
  | 'Rejected'
  | 'Deleted'
  | 'Delivered'
  | 'Failed'
  | 'Expired'
  | 'Unknown'
  | string;

/** @deprecated */
export type DeliveryReportStatusEnum = DeliveryReportEnum;

/**
 * The delivery report status code provides a more detailed view of what happened with a message. The REST API error codes are a combination of [SMPP error codes](/docs/sms/smpp/error-codes/#status-reports-error-codes), [MMS error codes](/docs/mms/7-service/mms-status-codes/) and custom codes.
 */
export type DeliveryReceiptCodeEnum = 0 | 400 | 401
  | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 410
  | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | number;

