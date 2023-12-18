/**
 * Model: VerificationResultEventResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { SMSRequestEventResponse } from '../sms-request-event-response';
import { FlashCallRequestEventResponse } from '../flash-call-request-event-response';
import { CalloutRequestEventResponse } from '../callout-request-event-response';

export type VerificationResultEventResponse = SMSRequestEventResponse
  | FlashCallRequestEventResponse
  | CalloutRequestEventResponse;
