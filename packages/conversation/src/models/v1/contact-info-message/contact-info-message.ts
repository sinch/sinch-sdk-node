/**
 * Message containing contact information.
 */
export interface ContactInfoMessage {
  /** @see ContactInfoMessageItem */
  contact_info_message: ContactInfoMessageItem;
}

export interface ContactInfoMessageItem {
  /** @see NameInfo */
  name: NameInfo;
  /** Phone numbers of the contact */
  phone_numbers: PhoneNumberInfo[];
  /** Physical addresses of the contact */
  addresses?: AddressInfo[];
  /** Email addresses of the contact */
  email_addresses?: EmailInfo[];
  /** @see OrganizationInfo */
  organization?: OrganizationInfo;
  /** URLs/websites associated with the contact */
  urls?: UrlInfo[];
  /** Date of birth in YYYY-MM-DD format. */
  birthday?: string;
}

/**
 * Name information of the contact.
 */
export interface NameInfo {
  /** Full name of the contact. Will be the displayed contact name. Format as desired. */
  full_name: string;
  /** First name/given name. */
  first_name?: string;
  /** Family name/last name/surname. */
  last_name?: string;
  /** Middle name. */
  middle_name?: string;
  /** Prefix before the name. e.g. Mr, Mrs, Dr etc. */
  prefix?: string;
  /** Suffix after the name. e.g. Jr or PhD */
  suffix?: string;
}

/**
 * Phone numbers of the contact.
 */
export interface PhoneNumberInfo {
  /** Phone number with country code included. */
  phone_number: string;
  /** Phone number type, e.g. WORK or HOME. */
  type?: string;
}

/**
 * Physical addresses of the contact.
 */
export interface AddressInfo {
  /** City Name */
  city?: string;
  /** Country Name */
  country?: string;
  /** Name of a state or region of a country. */
  state?: string;
  /** Zip/postal code */
  zip?: string;
  /** Address type, e.g. WORK or HOME */
  type?: string;
  /** Two letters country code. */
  country_code?: string;
}

/**
 * Email addresses of the contact.
 */
export interface EmailInfo {
  /** Email address. */
  email_address: string;
  /** Email address type. e.g. WORK or HOME. */
  type?: string;
}

/**
 * Organization information of the contact.
 */
export interface OrganizationInfo {
  /** Company name */
  company?: string;
  /** Department at the company */
  department?: string;
  /** Corporate title, e.g. Software engineer */
  title?: string;
}

/**
 * A URL/website
 */
export interface UrlInfo {
  /** The URL to be referenced */
  url: string;
  /** Optional. URL type, e.g. HOME, ORG or SOCIAL */
  type?: string;
}
