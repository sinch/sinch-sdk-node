export interface UpdateGroupRequestAutoUpdateAdd {

  /** Keyword to be sent in <a href=\"https://community.sinch.com/t5/Glossary/MO-Mobile-Originated/ta-p/7618\" target=\"_blank\">MO</a> to add phone number to a group opt-in keyword like \"JOIN\". If `auto_update.to` is dedicated long/short number or unique brand keyword like \"Sinch\" if it is a shared short code.  Constraints: Must be one word. */
  first_word?: string;
  /** Opt-in keyword like \"JOIN\" if auto_update.to is shared short code.  Constraints: Must be one word. */
  second_word?: string;
}


/** Validation regex for first_word */
export const firstWordPattern = /^\w+$/;
/** Validation regex for second_word */
export const secondWordPattern = /^\w+$/;
