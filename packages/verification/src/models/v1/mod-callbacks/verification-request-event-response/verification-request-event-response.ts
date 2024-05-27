import { SmsRequestEventResponse } from '../sms-request-event-response';
import { FlashCallRequestEventResponse } from '../flashcall-request-event-response';
import { CalloutRequestEventResponse } from '../callout-request-event-response';

export type VerificationRequestEventResponse = SmsRequestEventResponse
  | FlashCallRequestEventResponse
  | CalloutRequestEventResponse;
