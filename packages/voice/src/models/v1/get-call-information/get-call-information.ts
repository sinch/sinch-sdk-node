import { ReasonEnum, ResultEnum } from '../enums';
import { VoicePrice } from '../voice-price';
import { DestinationMxp, DestinationPstn, DestinationSip } from '../destination';

export interface GetCallInformation {

  /** Contains the caller information. */
  from?: DestinationMxp | DestinationPstn | DestinationSip;
  /** Contains the callee information. */
  to?: DestinationMxp | DestinationPstn | DestinationSip;
  /** Must be `pstn` for PSTN. */
  domain?: 'pstn' | string;
  /** The unique identifier of the call. */
  callId?: string;
  /** The duration of the call in seconds. */
  duration?: number;
  /** The status of the call. Either `ONGOING` or `FINAL` */
  status?: 'ONGOING' | 'FINAL' | string;
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
