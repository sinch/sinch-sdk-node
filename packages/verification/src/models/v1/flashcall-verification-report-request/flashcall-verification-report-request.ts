/**
 * Model: FlashcallVerificationReportRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { FlashcallVerificationReportRequestFlashCall } from '../flashcall-verification-report-request-flash-call';

export interface FlashcallVerificationReportRequest {

  /** The type of verification. */
  method: MethodEnum;
  /** @see FlashcallVerificationReportRequestFlashCall */
  flashCall: FlashcallVerificationReportRequestFlashCall;
}

export type MethodEnum = 'flashCall';
