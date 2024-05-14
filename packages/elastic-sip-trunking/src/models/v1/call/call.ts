import { Money } from '../money';
import { CallResult, DirectionEnum } from '../enum';

/**
 * The call resource represents an inbound or outbound connection between Sinch and a supported device
 */
export interface Call {
  /** The unique identifier of the call. */
  callId?: string;
  /** For `INBOUND` calls, this is the Sinch number the phone dialed. For `OUTBOUND` calls, this is the phone number you want to make a call to. Formatted according e164 format. */
  to?: string;
  /** For `INBOUND` calls, this is the number of the person calling. When making an outbound call set this to the your Sinch number you want to show up as Caller Id. The call\'s origination, formatted according to the call\'s `callType`. For calls in the telephone network, this is a phone number in [E.164](/docs/voice/api-reference/call-types) format, including the leading `+`. More info see [Call types](/docs/voice/api-reference/call-types) */
  from?: string;
  /** Describes whether the call was `INBOUND` *to* your Sinch number or was `OUTBOUND` and made *from* your Sinch number. */
  direction?: DirectionEnum;
  /** Time when call was answered */
  answerTime?: Date;
  /** The time the call ended */
  endTime?: Date;
  /** The duration of the call in seconds. For inbound calls, this is the time from when the call started until the call ended. For outbound calls, this is the time from when the call was answered until the call ended. */
  durationSeconds?: number;
  /** The result of the call */
  callResult?: CallResult;
  /** @see Money */
  pricePerMinute?: Money;
  /** The duration of the call adjusted with the billing period. */
  billingDurationSeconds?: number;
  /** @see Money */
  price?: Money;
  /** The time the call was created. */
  createTime?: Date;
  /** The ID of the project that the call belongs to. */
  projectId?: string;
  /** The ID of the trunk that the call was made through. */
  trunkId?: string;
}
