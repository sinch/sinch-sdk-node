import { CallResult, ReasonEnum, VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';
import { VerificationPriceCall } from '../verification-price-call';

/** @deprecated Use PhoneCallVerificationStatusResponse instead  */
export type CalloutVerificationStatusResponse = PhoneCallVerificationStatusResponse;

export interface PhoneCallVerificationStatusResponse {
  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `callout`. */
  method?: 'callout';
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** Shows whether the call is complete or not. */
  callComplete?: boolean;
  /** The result of the call. */
  callResult?: CallResult;
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** Prices associated with this verification */
  price?: VerificationPriceCall;
  /** @see Identity */
  identity?: Identity;
  /** The ID of the country to which the verification was sent. */
  countryId?: string;
  /** The timestamp in UTC format. </br> **Note:** The formatting does not respect `ISO-8601` and the returned value has the format `YYYY-MM-DDThh:mm:ss.SSS`. If you need to parse this value into a specific date object in your programming language, please append `Z` (Zulu time = UTC) at the end of the date value to match the `ISO-8601` format: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  verificationTimestamp?: Date;
}
