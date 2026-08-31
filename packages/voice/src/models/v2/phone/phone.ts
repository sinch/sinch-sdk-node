import { PhonePhone } from '../phone-phone';

/**
 * Routes the call to a phone number on the Public Switched Telephone Network (PSTN).
 */
export interface Phone {
  /** Routes the call to a phone number on the Public Switched Telephone Network (PSTN). The number must be in E.164 format. */
  type: TypeEnum;
  /** @see PhonePhone */
  phone: PhonePhone;
}
export type TypeEnum = 'PHONE' | string;
