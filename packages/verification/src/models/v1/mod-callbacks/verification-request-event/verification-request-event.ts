import { Identity } from '../../identity';
import { Price } from '../../price';

export interface VerificationRequestEvent {

  /** The ID of the verification request. */
  id: string;
  /** The type of the event. */
  event: 'VerificationRequestEvent';
  /** The verification method. */
  method: MethodEnum;
  /** @see Identity */
  identity: Identity;
  /** The amount of money and currency of the verification request. */
  price?: Price;
  /** The amount of money and currency of the verification request. */
  rate?: Price;
  /** Used to pass your own reference in the request for tracking purposes. */
  reference?: string;
  /** Can be used to pass custom data in the request. */
  custom?: string;
  /** List of strings */
  acceptLanguage?: string[];
}

export type MethodEnum = 'sms' | 'flashcall' | 'callout';

