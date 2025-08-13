import { Identity } from '../../identity';

export interface VerificationSmsDeliveredEvent {
  /** The ID of the verification request. */
  id: string;
  /** The type of the event. */
  event: 'VerificationSmsDeliveredEvent';
  /** The verification method. */
  method: 'sms' | string;
  /** @see Identity */
  identity: Identity;
  /** The result of the SMS delivery. Possible values can be extended in the future. */
  smsResult: 'Successful' | 'Failed' | string;
  /** Used to pass your own reference in the request for tracking purposes. */
  reference?: string;
  /** Can be used to pass custom data in the request. */
  custom?: string;
}
