import { Money } from '../money';

/**
 * The phone numbers that are available to be rented in the <a href=\"https://dashboard.sinch.com/numbers/buy-numbers\" target=\"_blank\">Sinch Customer Dashboard</a> or via the public numbers API.
 */
export interface AvailableNumber {
  /** The phone number in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format with leading `+`. Example `+12025550134`. */
  phoneNumber?: string;
  /** ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode?: string;
  /** The number type. */
  type?: string;
  /** The capability of the number. */
  capability?: string[];
  /** @see Money */
  setupPrice?: Money;
  /** @see Money */
  monthlyPrice?: Money;
  /** How often the recurring price is charged in months. */
  paymentIntervalMonths?: number;
  /** Whether or not supplementary documentation will be required to complete the number rental. */
  supportingDocumentationRequired?: boolean;
}
