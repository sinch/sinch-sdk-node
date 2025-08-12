import { VerificationRequestEvent } from './verification-request-event';
import { VerificationResultEvent } from './verification-result-event';
import { VerificationSmsDeliveredEvent } from './verification-sms-delivered-event';

export type VerificationCallbackEvent =
  VerificationRequestEvent
  | VerificationResultEvent
  | VerificationSmsDeliveredEvent;
