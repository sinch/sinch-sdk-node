import { ReasonEnum, SourceEnum, VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';
import { VerificationPriceSms } from '../verification-price-sms';

export interface WhatsAppVerificationStatusResponse {

  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `whatsapp`. */
  method?: 'whatsapp';
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** Used to pass your own reference in the request for tracking purposes. Must be a unique value for each started verification request. The value must be encodable in the URL path segment. This value is passed to all events and returned from the status and report endpoints. The reference can be used to check the [status of verifications](https://developers.sinch.com/docs/verification/api-reference/verification/tag/Verification-status/#tag/Verification-status/operation/VerificationStatusByReference), like with ID or identity. */
  reference?: string;
  /** Prices associated with this verification */
  price?: VerificationPriceSms;
  /** @see Identity */
  identity?: Identity;
  /** The ID of the country to which the verification was sent. */
  countryId?: string;
  /** The timestamp in UTC format. </br> **Note:** The formatting does not respect `ISO-8601` and the returned value has the format `YYYY-MM-DDThh:mm:ss.SSS`. If you need to parse this value into a specific date object in your programming language, please append `Z` (Zulu time = UTC) at the end of the date value to match the `ISO-8601` format: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  verificationTimestamp?: Date;
  /** @see Source */
  source?: SourceEnum;
}
