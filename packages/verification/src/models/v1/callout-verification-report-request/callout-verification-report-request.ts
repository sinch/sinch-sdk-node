/**
 * Model: CalloutVerificationReportRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CalloutVerificationReportRequestCallout } from '../callout-verification-report-request-callout';

export interface CalloutVerificationReportRequest {

  /** The type of verification. */
  method: MethodEnum;
  /** @see CalloutVerificationReportRequestCallout */
  callout: CalloutVerificationReportRequestCallout;
}

export type MethodEnum = 'callout';
