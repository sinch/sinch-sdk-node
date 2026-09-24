/**
 * A monetary amount with an associated currency code.
 */
export interface Money {
  /** The 3-letter currency code defined in [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). */
  currencyCode: string;
  /** The monetary amount as a string to preserve precision. Supports up to 4 decimal places (e.g., `"10.5000"`, `"0.9999"`). */
  amount: string;
}
