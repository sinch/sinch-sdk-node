import { Identity } from '../identity';

export interface StartVerificationWithSms extends StartVerificationBase {}

export interface StartVerificationWithFlashCall extends StartVerificationBase {
  /** @see FlashCallOptions */
  flashCallOptions?: FlashCallOptions;
}

export interface StartVerificationWithCallout extends StartVerificationBase {}

export interface StartSeamlessVerification extends StartVerificationBase {}

export interface StartVerificationBase {

  /** @see Identity */
  identity: Identity;
  /** Used to pass your own reference in the request for tracking purposes. */
  reference?: string;
  /** Can be used to pass custom data in the request. */
  custom?: string;
}

/**
 * An optional object for flashCall verifications. It allows you to specify dial time out parameter for flashCall. FlashCallOptions object can be specified optionally, and only if the verification request was triggered from your backend (no SDK client) through an [Application signed request](/docs/voice/api-reference/authentication/signed-request).
 */
export interface FlashCallOptions {

  /** The dial timeout in seconds. */
  dialTimeout?: number;
}
