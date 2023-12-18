/**
 * Model: DeliveryReport
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { MessageDeliveryStatus } from '../message-delivery-status';

export interface DeliveryReport {

  /** The ID of the batch this delivery report belongs to. */
  batch_id: string;
  /** The client identifier of the batch this delivery report belongs to, if set when submitting batch. */
  client_reference?: string;
  /** Array with status objects. Only status codes with at least one recipient will be listed. */
  statuses: MessageDeliveryStatus[];
  /** The total number of messages in the batch. */
  total_message_count: number;
  /** The delivery report type. */
  type: TypeEnum;
}

export type TypeEnum = 'delivery_report_sms' | 'delivery_report_mms';

