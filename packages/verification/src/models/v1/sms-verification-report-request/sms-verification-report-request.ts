/**
 * Model: SmsVerificationReportRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { SmsVerificationReportRequestSms } from '../sms-verification-report-request-sms';

export interface SmsVerificationReportRequest {

  /** The type of verification. */
  method: MethodEnum;
  /** @see SmsVerificationReportRequestSms */
  sms: SmsVerificationReportRequestSms;
}

export type MethodEnum = 'sms';
