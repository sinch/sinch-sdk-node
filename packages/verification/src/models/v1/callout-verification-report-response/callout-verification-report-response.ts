import { VerificationReportResponsePrice } from '../verification-report-response-price';
import { VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';

export interface CalloutVerificationReportResponse {

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
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** @see VerificationReportResponsePrice */
  price?: VerificationReportResponsePrice;
  /** */
  identity?: Identity;
  /** */
  countryId?: string,
  /** */
  verificationTimestamp?: Date;
  /** */
  callResult?: string;
}

export type ReasonEnum = 'Fraud'
  | 'Not enough credit'
  | 'Blocked'
  | 'Denied by callback'
  | 'Invalid callback'
  | 'Internal error'
  | 'Destination denied'
  | 'Network error or number unreachable'
  | 'Failed pending'
  | 'SMS delivery failure'
  | 'Invalid CLI'
  | 'Invalid code'
  | 'Expired'
  | 'Hung up without entering valid code';
