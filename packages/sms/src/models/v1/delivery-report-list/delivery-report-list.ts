/**
 * Model: DeliveryReportList
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { RecipientDeliveryReport } from '../recipient-delivery-report';

export interface DeliveryReportList {

  /** The total number of entries matching the given filters. */
  count?: number;
  /** The requested page. */
  page?: number;
  /** The number of entries returned in this request. */
  page_size?: number;
  /** The page of delivery reports matching the given filters. */
  delivery_reports?: RecipientDeliveryReport[];
}


