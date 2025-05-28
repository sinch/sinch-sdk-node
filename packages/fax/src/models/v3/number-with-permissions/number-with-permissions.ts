import { Permissions } from '../enums';

/**
 * A phone number and its permissions.
 */
export interface NumberWithPermissions {
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading \'+\'. */
  number?: string;
  /** Allows you to set permissions for sending and receiving faxes to this email/phone number combination. Default value is `both`. */
  permissions?: Permissions;
}
