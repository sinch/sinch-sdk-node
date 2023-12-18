/**
 * Model: FlashCallInitiateVerificationResponseFlashCall
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The response contains the `cliFilter` and `interceptionTimeout` properties.
 */
export interface FlashCallInitiateVerificationResponseFlashCall {

  /** Filter that should be applied for incoming calls to intercept the Flashcall. */
  cliFilter: string;
  /** Amount of seconds client should wait for the Flashcall. */
  interceptionTimeout: number;
  /** The time in seconds allowed for reporting the code after which the verification will expire. */
  reportTimeout?: number;
  /** Used by the SDKs, this setting makes the handset deny the flashcall after the set time in seconds. */
  denyCallAfter?: number;
}


