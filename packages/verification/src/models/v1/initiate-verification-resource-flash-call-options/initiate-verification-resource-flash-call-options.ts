/**
 * Model: InitiateVerificationResourceFlashCallOptions
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * An optional object for flashCall verifications. It allows you to specify dial time out parameter for flashCall. FlashCallOptions object can be specified optionally, and only if the verification request was triggered from your backend (no SDK client) through an [Application signed request](/docs/voice/api-reference/authentication/signed-request).
 */
export interface InitiateVerificationResourceFlashCallOptions {

  /** The dial timeout in seconds. */
  dialTimeout?: number;
}


