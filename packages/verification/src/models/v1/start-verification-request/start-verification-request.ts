import { Identity } from '../identity';
import { WithAdditionalProperties } from '@sinch/sdk-client';
import { CodeType, WhatsAppCodeType } from '../enums';

export interface StartVerificationWithSms extends StartVerificationBase {
  /** @see SmsOptions */
  smsOptions?: SmsOptions;
}

export interface StartVerificationWithFlashCall extends StartVerificationBase {
  /** @see FlashCallOptions */
  flashCallOptions?: FlashCallOptions;
}

export interface StartVerificationWithPhoneCall extends StartVerificationBase {
  /** @see PhoneCallOptions */
  phoneCallOptions?: PhoneCallOptions;
}

export interface StartVerificationWithPhoneCallServerModel extends StartVerificationBase {
  /** @see PhoneCallOptions */
  calloutOptions?: PhoneCallOptions;
}

/** @deprecated Use StartVerificationWithPhoneCall instead */
export interface StartVerificationWithCallout extends StartVerificationBase {
  /** @see CalloutOptions */
  calloutOptions?: CalloutOptions;
}

export interface StartDataVerification extends StartVerificationBase {}

/** @deprecated Use StartDataVerification instead */
export type StartSeamlessVerification = StartDataVerification;

export interface StartVerificationWithWhatsApp extends StartVerificationBase {
  /** @see WhatsAppOptions */
  whatsappOptions?: WhatsAppOptions;
}

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
export interface SmsOptions extends WithAdditionalProperties {
  /** The expiration time for a verification process is represented in the format `HH:MM:SS`. */
  expiry?: Date | string;
  /** Accepted values for the type of code to be generated are `Numeric`, `Alpha`, and `Alphanumeric`. Default is `Numeric`. */
  codeType?: CodeType;
  /** A `language-region` identifier according to [IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Only a subset of those identifiers is accepted. */
  locale?: string;
}

/**
 * An optional configuration for Flash Call Verification, should be used only when the verification request originates from your backend (not an end user device) and request is signed via an [Application signed request](https://developers.sinch.com/docs/voice/api-reference/authentication/signed-request).
 */
export interface FlashCallOptions extends WithAdditionalProperties {
  /** The amount of time that a phone will ring. */
  dialTimeout?: number;
  /** The maximum time that a phone call verification will be active and can be completed. If the phone number hasn't been verified successfully during this time, then the verification request will fail. By default, the Sinch dashboard will automatically optimize dial time out during a phone call. */
  interceptionTimeout?: number;
}

/** @deprecated Use PhoneCallOptions instead */
export type CalloutOptions = PhoneCallOptions;

/**
 * An optional object for Phone Call Verification, with default values assumed for all contained values if not provided.
 */
export interface PhoneCallOptions extends WithAdditionalProperties {
  /** @see PhoneCallOptionsSpeech */
  speech?: PhoneCallOptionsSpeech;
}
/** @deprecated Use PhoneCallOptionsSpeech instead */
export type CalloutOptionsSpeech = PhoneCallOptionsSpeech;

/**
 * Text-To-Speech engine settings
 */
export interface PhoneCallOptionsSpeech {
  /** A `language-region` identifier according to [IANA](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). Only a subset of those identifiers is accepted. */
  locale?: string;
}

/**
 * An optional configuration for WhatsApp Verification, should be used only when the verification request originates from your backend (not an end user device) and request is signed via an [Application signed request](https://developers.sinch.com/docs/voice/api-reference/authentication/signed-request).
 */
export interface WhatsAppOptions extends WithAdditionalProperties {
  /** Selects type of code which will be sent to customer */
  codeType?: WhatsAppCodeType;
}
