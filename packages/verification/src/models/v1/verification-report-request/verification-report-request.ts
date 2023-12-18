/**
 * Model: VerificationReportRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CalloutVerificationReportRequest } from '../callout-verification-report-request';
import { FlashcallVerificationReportRequest } from '../flashcall-verification-report-request';
import { SmsVerificationReportRequest } from '../sms-verification-report-request';

export type VerificationReportRequest = SmsVerificationReportRequest
  | FlashcallVerificationReportRequest
  | CalloutVerificationReportRequest;
