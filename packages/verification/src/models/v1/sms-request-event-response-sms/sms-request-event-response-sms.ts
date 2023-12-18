/**
 * Model: SMSRequestEventResponseSms
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


export interface SMSRequestEventResponseSms {

  /** The SMS PIN that should be used. By default, the Sinch dashboard will automatically generate PIN codes for SMS verification. If you want to set your own PIN, you can specify it in the response to the Verification Request Event. */
  code?: string;
  /** List of strings */
  acceptLanguage?: string[];
}


