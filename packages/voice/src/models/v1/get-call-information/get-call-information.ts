import { ReasonEnum, ResultEnum } from '../enums';
import { VoicePrice } from '../voice-price';
import { Participant } from '../participant';

export interface GetCallInformation {

  /** Contains the caller information. */
  from?: Participant;
  /** Contains the callee information. */
  to?: Participant;
  /** Must be `pstn` for PSTN. */
  domain?: 'pstn';
  /** The unique identifier of the call. */
  callId?: string;
  /** The duration of the call in seconds. */
  duration?: number;
  /** The status of the call. Either `ONGOING` or `FINAL` */
  status?: 'ONGOING' | 'FINAL';
  /** Contains the result of a call. */
  result?: ResultEnum;
  /** Contains the reason why a call ended. */
  reason?: ReasonEnum;
  /** The date and time of the call. */
  timestamp?: Date;
  /** An object that can be used to pass custom information related to the call. */
  custom?: string;
  /** The rate per minute that was charged for the call. */
  userRate?: VoicePrice;
  /** The total amount charged for the call. */
  debit?: VoicePrice;
}
