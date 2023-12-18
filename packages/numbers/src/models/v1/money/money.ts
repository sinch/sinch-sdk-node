/**
 * Model: Money
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

/**
 * An object giving details on currency code and the amount charged.
 */
export interface Money {
  /** The 3-letter currency code defined in <a href=\"https://www.iso.org/iso-4217-currency-codes.html\" target=\"_blank\">ISO 4217</a>. */
  currencyCode?: string;
  /** The amount in decimal form. For example `2.00`. There are no guarantees on the precision unless documented by the message origin. The amount cannot be updated and is read-only. */
  amount?: string;
}
