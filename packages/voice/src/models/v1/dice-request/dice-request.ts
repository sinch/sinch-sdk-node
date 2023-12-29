/**
 * Model: DiceRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CallHeader } from '../call-header';
import { DiceRequestDebit } from '../dice-request-debit';
import { DiceRequestUserRate } from '../dice-request-user-rate';
import { IceRequestTo } from '../ice-request-to';

/**
 * The request body of a Disconnected Call Event.
 */
export interface DiceRequest {

  /** Must have the value `dice`. */
  event?: string;
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The reason the call was disconnected. */
  reason?: string;
  /** The result of the call. */
  result?: string;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** @see DiceRequestDebit */
  debit?: DiceRequestDebit;
  /** @see DiceRequestUserRate */
  userRate?: DiceRequestUserRate;
  /** @see IceRequestTo */
  to?: IceRequestTo;
  /** The duration of the call in seconds. */
  duration?: number;
  /** Information about the initiator of the call. */
  from?: string;
  /** If the call was initiated by a Sinch SDK client, call headers are the headers specified by the *caller* client. Read more about call headers [here](../../../call-headers/). */
  callHeaders?: CallHeader[];
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
}


