/**
 * Model: GroupObjectAutoUpdateRemove
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Keyword to be sent in MO to remove from a group.
 */
export interface GroupObjectAutoUpdateRemove {

  /** Opt-out keyword like \"LEAVE\" If auto_update.to is dedicated long/short number or unique brand keyword like \"Sinch\" if it is a shared short code.  Constraints: Must be one word. */
  first_word?: string;
  /** Opt-out keyword like \"LEAVE\" if auto_update.to is shared short code.  Constraints: Must be one word. */
  second_word?: string;
}


/** Validation regex for first_word */
export const firstWordPattern = /^\w+$/;
/** Validation regex for second_word */
export const secondWordPattern = /^\w+$/;
