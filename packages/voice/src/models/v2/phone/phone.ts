import { PhoneDetails } from '../phone-details';

/**
 * Routes the call to a phone number on the Public Switched Telephone Network (PSTN).
 */
export interface Phone {
  /** Routes the call to a phone number on the Public Switched Telephone Network (PSTN). The number must be in E.164 format. */
  type: TypeEnum;
  /** @see PhoneDetails */
  phone: PhoneDetails;
}
export type TypeEnum = 'PHONE' | string;
