/**
 * Model: InitiateVerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CalloutInitiateVerificationResponse } from '../callout-initiate-verification-response';
import { DataInitiateVerificationResponse } from '../data-initiate-verification-response';
import { FlashCallInitiateVerificationResponse } from '../flash-call-initiate-verification-response';
import { SMSInitiateVerificationResponse } from '../sms-initiate-verification-response';

export type InitiateVerificationResponse = SMSInitiateVerificationResponse
  | FlashCallInitiateVerificationResponse
  | CalloutInitiateVerificationResponse
  | DataInitiateVerificationResponse;
