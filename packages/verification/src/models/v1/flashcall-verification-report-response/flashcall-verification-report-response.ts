/**
 * Model: FlashcallVerificationReportResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { FlashcallVerificationReportResponsePrice } from '../flashcall-verification-report-response-price';
import { VerificationStatusEnum } from '../enums';
import { Identity } from '../identity';

export interface FlashcallVerificationReportResponse {

  /** The unique ID of the verification request. */
  id?: string;
  /** The method of the verification request. This will always be `flashCall`. */
  method?: MethodEnum;
  /** The status of the verification request. */
  status?: VerificationStatusEnum;
  /** Displays the reason why a verification has `FAILED`, was `DENIED`, or was `ABORTED`. */
  reason?: ReasonEnum;
  /** The reference ID that was optionally passed together with the verification request. */
  reference?: string;
  /** @see FlashcallVerificationReportResponsePrice */
  price?: FlashcallVerificationReportResponsePrice;
  /** Free text that the client is sending, used to show if the call/SMS was intercepted or not. */
  source?: SourceEnum;
  /** */
  identity?: Identity;
  /** */
  countryId?: string;
  /** */
  verificationTimestamp?: Date;
  /** */
  callComplete?: boolean;
  /** */
  callResult?: string;
}

export type MethodEnum = 'flashcall';
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
