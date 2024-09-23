import { VerificationRequestEvent } from './verification-request-event';
import { VerificationResultEvent } from './verification-result-event';

export type VerificationCallbackEvent = VerificationRequestEvent | VerificationResultEvent;
