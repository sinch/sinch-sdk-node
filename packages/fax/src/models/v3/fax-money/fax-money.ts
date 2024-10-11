/**
 * This is where we need description to be overridden by `$ref:` description
 */
export interface FaxMoney {
  /** The 3-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The amount with 4 decimals and decimal delimiter `.`. */
  amount?: string;
}
