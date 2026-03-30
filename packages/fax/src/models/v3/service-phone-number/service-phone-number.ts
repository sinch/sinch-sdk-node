import { Permissions } from '../enums';

export interface ServicePhoneNumber {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading '+'. */
  phoneNumber?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** ID of the fax service used. */
  serviceId?: string;
  /** Allows you to set permissions for sending and receiving faxes to this email/phone number combination. Default value is `both`. */
  permissions?: Permissions;
}
