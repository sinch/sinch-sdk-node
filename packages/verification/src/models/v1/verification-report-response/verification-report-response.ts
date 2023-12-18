/**
 * Model: VerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CalloutVerificationReportResponse } from '../callout-verification-report-response';
import { FlashcallVerificationReportResponse } from '../flashcall-verification-report-response';
import { SMSVerificationReportResponse } from '../sms-verification-report-response';

export type VerificationReportResponse = SMSVerificationReportResponse
  | FlashcallVerificationReportResponse
  | CalloutVerificationReportResponse;
