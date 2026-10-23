/**
 * Response detailing the suspended number.
 */
export interface SuspendPhoneNumberResponse {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  phoneNumber?: string;
  /** The country code of the phone number in ISO 3166-1 alpha-2 format. */
  country?: string;
  /** Specifies if a number is suspended or not. */
  suspended?: boolean;
  /** An optional field providing context about the suspension. */
  note?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** ID of the fax service used. */
  serviceId?: string;
  /** The timestamp on which the phone number was created. */
  createdAt?: Date;
  /** The timestamp on which the phone number was updated. */
  updatedAt?: Date;
}
