/**
 * Keyword to be sent in MO to add MSISDN to a group
 */
export interface AddKeyword {
  /** Opt-in keyword like "JOIN" if `auto_update.to` is dedicated long/short number or unique brand keyword like "Sinch" if it is a shared short code. */
  first_word: string;
  /** Opt-in keyword like "JOIN" if `auto_update.to` is shared short code. */
  second_word?: string;
}

/** Validation regex for first_word */
export const firstWordPattern = /^\w+$/;

/** Validation regex for second_word */
export const secondWordPattern = /^\w+$/;
