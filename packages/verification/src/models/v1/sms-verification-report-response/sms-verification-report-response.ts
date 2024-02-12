import { VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';
import { SMSVerificationReportResponsePrice } from '../verification-report-response-price';

export interface SMSVerificationReportResponse {

  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `sms`. */
  method?: 'sms';
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** @see SMSVerificationReportResponsePrice */
  price?: SMSVerificationReportResponsePrice;
  /** Free text that the client is sending, used to show if the call/SMS was intercepted or not. */
  source?: SourceEnum;
  /** */
  identity?: Identity;
  /** */
  countryId?: string;
  /** */
  verificationTimestamp?: Date;
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

export type SourceEnum = 'intercepted' | 'manual';

