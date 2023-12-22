/**
 * Model: Option
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * A configured option that the user can trigger to perform an action.
 */
export interface Option {

  /** A DTMF digit the user can press to trigger the configured action. */
  dtmf: string;
  /** Determines which action is taken when the DTMF digit is pressed. */
  action: string;
}


