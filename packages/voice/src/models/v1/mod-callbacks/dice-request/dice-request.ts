import { CallHeader } from '../../call-header';
import { VoicePrice } from '../../voice-price';
import { Participant } from '../../participant';
import { ReasonEnum, ResultEnum } from '../../enums';

/**
 * The request body of a Disconnected Call Event.
 */
export interface DiceRequest {

  /** Must have the value `dice`. */
  event?: 'dice';
  /** The unique ID assigned to this call. */
  callid?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The reason the call was disconnected. */
  reason?: ReasonEnum;
  /** The result of the call. */
  result?: ResultEnum;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** An object containing currency and total amount charged for the call. */
  debit?: VoicePrice;
  /** An object containing currency and rate per minute for the call. */
  userRate?: VoicePrice;
  /** @see Participant */
  to?: Participant;
  /** The duration of the call in seconds. */
  duration?: number;
  /** Information about the initiator of the call. */
  from?: string;
  /** If the call was initiated by a Sinch SDK client, call headers are the headers specified by the *caller* client. Read more about call headers [here](../../../call-headers/). */
  callHeaders?: CallHeader[];
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
}


