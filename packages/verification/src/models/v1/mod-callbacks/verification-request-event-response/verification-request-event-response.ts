import { SmsRequestEventResponse } from '../sms-request-event-response';
import { FlashCallRequestEventResponse } from '../flashcall-request-event-response';
import { PhoneCallRequestEventResponse } from '../phonecall-request-event-response';

export type VerificationRequestEventResponse = SmsRequestEventResponse
  | FlashCallRequestEventResponse
  | PhoneCallRequestEventResponse;
