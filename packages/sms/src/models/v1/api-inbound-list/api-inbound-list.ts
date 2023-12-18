/**
 * Model: ApiInboundList
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { InboundMessageResponse } from '../inbound-message-response';

export interface ApiInboundList {

  /** The total number of inbounds matching the given filters */
  count?: number;
  /** The requested page. */
  page?: number;
  /** The page of inbounds matching the given filters. */
  inbounds?: InboundMessageResponse[];
  /** The number of inbounds returned in this request. */
  page_size?: number;
}


