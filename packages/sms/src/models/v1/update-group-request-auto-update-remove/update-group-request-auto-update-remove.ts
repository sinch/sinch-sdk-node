/**
 * Model: UpdateGroupRequestAutoUpdateRemove
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Keyword to be sent in MO to remove from a group.
 */
export interface UpdateGroupRequestAutoUpdateRemove {

  /** Opt-out keyword. For example, \"LEAVE\" if `auto_update.to` is a dedicated long/short number or a unique brand keyword like \"Sinch\" (if it is a shared short code).  Constraints: Must be one word. */
  first_word?: string;
  /** Opt-out keyword. For example, \"LEAVE\" if `auto_update.to` is a shared short code.  Constraints: Must be one word. */
  second_word?: string;
}


/** Validation regex for first_word */
export const firstWordPattern = /^\w+$/;
/** Validation regex for second_word */
export const secondWordPattern = /^\w+$/;
