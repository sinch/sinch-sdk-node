/**
 * With country permissions you can control which countries can be dialed from your account. For beta only, countries supported are US,CA and * if you would like to allow international dialing.
 */
export interface CountryPermission {
  /** The [ISO code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country */
  isoCode?: string;
  /** Country name in english */
  name?: string;
  /** Continent of the country */
  continent?: string;
  /** The country calling codes as an array, most countries have only one but some have multiple like the San Marino, China, and a few others. */
  countryDialingCodes?: string[];
  /** If the country is enabled or not. When this is enabled regular numbers can be dialed from the account. */
  enabled: boolean;
}
