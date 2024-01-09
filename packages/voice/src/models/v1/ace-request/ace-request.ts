/**
 * Model: AceRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { AceRequestAmd } from '../ace-request-amd';

/**
 * The request body of an Answered Call Event.
 */
export interface AceRequest {

  /** Must have the value `ace`. */
  event?: 'ace';
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** @see AceRequestAmd */
  amd?: AceRequestAmd;
}


