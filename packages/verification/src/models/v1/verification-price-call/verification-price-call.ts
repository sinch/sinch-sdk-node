import { Price } from '../price';

/**
 * Prices associated with this verification
 */
export interface VerificationPriceCall {

  /** The maximum price charged for this verification process.  This property will appear in the body of the response with a delay.  It will become visible only when the verification status is other than PENDING.  */
  verificationPrice?: Price;
  /** The maximum cost of the call made during this verification process.  Present only when termination debiting is enabled (disabled by default).  This property will appear in the body of the response with a delay.  It will become visible only after the call is completed, when its cost is known to Sinch.  */
  terminationPrice?: Price;
  /** The time of the call for which the fee was charged.  Present only when termination debiting is enabled (disabled by default).  Depending on the type of rounding used, the value is the actual call time rounded to the nearest second, minute or other value.  */
  billableDuration?: number;
}
