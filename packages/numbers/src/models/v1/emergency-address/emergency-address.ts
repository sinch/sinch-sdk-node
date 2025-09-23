/**
 * Details of the emergency address.
 */
export interface EmergencyAddress {
  /** The street number for the emergency address. */
  streetNumber?: string;
  /** The street name of the emergency location. */
  streetInfo?: string;
  /** The location for address. */
  location?: string;
  /** The city of the emergency location. */
  city?: string;
  /** The state or province of the emergency location. */
  state?: string;
  /** The postal code of the emergency location. */
  postalCode?: string;
  /** The postal code of the emergency location. */
  postalCodePlusFour?: string;
}
