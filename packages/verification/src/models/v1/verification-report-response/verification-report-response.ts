import { CalloutVerificationReportResponse } from '../callout-verification-report-response';
import { FlashCallVerificationReportResponse } from '../flashcall-verification-report-response';
import { SMSVerificationReportResponse } from '../sms-verification-report-response';

export type VerificationReportResponse = SMSVerificationReportResponse
  | FlashCallVerificationReportResponse
  | CalloutVerificationReportResponse;
