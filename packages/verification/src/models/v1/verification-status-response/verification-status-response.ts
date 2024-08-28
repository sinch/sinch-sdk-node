import { SmsVerificationStatusResponse } from '../sms-verification-status-response';
import { FlashCallVerificationStatusResponse } from '../flashcall-verification-status-response';
import {
  CalloutVerificationStatusResponse,
  PhoneCallVerificationStatusResponse,
} from '../phonecall-verification-status-response';

export type VerificationStatusResponse = SmsVerificationStatusResponse
  | FlashCallVerificationStatusResponse
  | CalloutVerificationStatusResponse
  | PhoneCallVerificationStatusResponse;
