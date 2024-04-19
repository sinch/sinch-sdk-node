import { SMSVerificationStatusResponse } from '../sms-verification-status-response';
import { FlashCallVerificationStatusResponse } from '../flashcall-verification-status-response';
import { CalloutVerificationStatusResponse } from '../callout-verification-status-response';

export type VerificationStatusResponse = SMSVerificationStatusResponse
  | FlashCallVerificationStatusResponse
  | CalloutVerificationStatusResponse;
