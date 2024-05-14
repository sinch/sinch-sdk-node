/**
 * A Sinch phone number assigned to a SIP trunk. This must be a number you own and configured for Elastic SIP Trunking.
 */
export interface PhoneNumber {
  /** The ID of the phone number. */
  id?: string;
  /** The ID of the SIP trunk to which the phone number is assigned. */
  sipTrunkId?: string;
  /** A phone number in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format, including the leading \'+\'. */
  phoneNumber?: string;
  /** The country code of the phone number in ISO 3166-1 alpha-2 format. */
  countryCode?: string;
  /** The date and time that the number was assigned to the SIP trunk. */
  createTime?: Date;
  /** The date and time that the phone number was last modified. */
  updateTime?: Date;
}
