import { Price } from '../price';

/**
 * Prices associated with this verification
 */
export interface VerificationPriceSms {

  /** The maximum price charged for this verification process.  This property will appear in the body of the response with a delay.  It will become visible only when the verification status is other than PENDING.  */
  verificationPrice?: Price;
}
