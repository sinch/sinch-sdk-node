/**
 * Model: IceRequestUserRate
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The rate that will be charged for the call established to the original destination. If the SVAML response specifies another destination, the same rate may not apply.
 */
export interface IceRequestUserRate {

  /** The currency ID of the rate, for example, `USD`. */
  currencyId?: string;
  /** The amount of the rate. */
  amount?: number;
}


