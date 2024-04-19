import { Identity } from '../identity';

export interface StartVerificationWithSms extends StartVerificationBase {
  /** @see SmsOptions */
  smsOptions?: SmsOptions;
}

export interface StartVerificationWithFlashCall extends StartVerificationBase {
  /** @see FlashCallOptions */
  flashCallOptions?: FlashCallOptions;
}

export interface StartVerificationWithCallout extends StartVerificationBase {
  /** @see CalloutOptions */
  calloutOptions?: CalloutOptions;
}

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
 * An optional object for SMS Verification, with default values assumed for all contained values if not provided.
 */
export interface SmsOptions {
  /** The expiration time for a verification process is represented in the format `HH:MM:SS`. */
  expiry?: string;
  /** Accepted values for the type of code to be generated are `Numeric`, `Alpha`, and `Alphanumeric`. Default is `Numeric`. */
  codeType?: CodeType;
  /** The SMS template must include a placeholder `{{CODE}}` where the verification code will be inserted, and it can otherwise be customized as desired. */
  template?: string;
}

export type CodeType = 'Numeric' | 'Alpha' | 'Alphanumeric';

/**
 * An optional object for flashCall verifications. It allows you to specify dial time out parameter for flashCall. FlashCallOptions object can be specified optionally, and only if the verification request was triggered from your backend (no SDK client) through an [Application signed request](/docs/voice/api-reference/authentication/signed-request).
 */
export interface FlashCallOptions {
  /** The dial timeout in seconds. */
  dialTimeout?: number;
}

/**
 * An optional object for Phone Call Verification, with default values assumed for all contained values if not provided.
 */
export interface CalloutOptions {
  /** @see CalloutOptionsSpeech */
  speech?: CalloutOptionsSpeech;
}

/**
 * Text-To-Speech engine settings
 */
export interface CalloutOptionsSpeech {
  /** A `language-region` identifier according to [IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Only a subset of those identifiers is accepted. */
  locale?: string;
}
