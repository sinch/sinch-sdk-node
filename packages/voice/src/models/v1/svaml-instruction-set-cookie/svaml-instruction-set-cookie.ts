/**
 * Model: SvamlInstructionSetCookie
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Creates a cookie for the duration of the call.
 */
export interface SvamlInstructionSetCookie {

  /** The `name` property. Must have the value `setCookie`. */
  name: 'setCookie';
  /** The name of the cookie you want to set. */
  key?: string;
  /** The value of the cookie you want to set. */
  value?: string;
}


