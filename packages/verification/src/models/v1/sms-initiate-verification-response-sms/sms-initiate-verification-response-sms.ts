/**
 * Model: SMSInitiateVerificationResponseSms
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The response contains the `template` of the SMS to be expected and intercepted.
 */
export interface SMSInitiateVerificationResponseSms {

  /** The expected template for the SMS response. */
  template?: string;
  /** The amount of time in seconds that the client should wait for the SMS. */
  interceptionTimeout?: number;
}


