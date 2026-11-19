import { Permissions } from '../enums';

/**
 * A phone number and its permissions.
 */
export interface NumberWithPermissions {
  /** A phone number in [E.164](https://support.sinch.com/hc/en-us/articles/52299961578771-E-164) format, including the leading \'+\'. */
  number?: string;
  /** Allows you to set permissions for sending and receiving faxes to this email/phone number combination. Default value is `both`. */
  permissions?: Permissions;
}
