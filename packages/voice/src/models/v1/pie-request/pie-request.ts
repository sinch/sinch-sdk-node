/**
 * Model: PieRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { PieRequestMenuResult } from '../pie-request-menu-result';

/**
 * The request body of a Prompt Input Event.
 */
export interface PieRequest {

  /** Must have the value `pie`. */
  event?: 'pie';
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** @see PieRequestMenuResult */
  menuResult?: PieRequestMenuResult;
  /** The current API version. */
  version?: number;
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
}


