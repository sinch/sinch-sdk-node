/**
 * Model: VerificationRequestEvent
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { Identity } from '../identity';
import { VerificationRequestEventPrice } from '../verification-request-event-price';

export interface VerificationRequestEvent {

  /** The ID of the verification request. */
  id: string;
  /** The type of the event. */
  event: 'VerificationRequestEvent';
  /** The verification method. */
  method: MethodEnum;
  /** @see Identity */
  identity: Identity;
  /** @see VerificationRequestEventPrice */
  price?: VerificationRequestEventPrice;
  /** */
  rate?: VerificationRequestEventPrice;
  /** Used to pass your own reference in the request for tracking purposes. */
  reference?: string;
  /** Can be used to pass custom data in the request. */
  custom?: string;
  /** List of strings */
  acceptLanguage?: string[];
}

export type MethodEnum = 'sms' | 'flashcall' | 'callout';

