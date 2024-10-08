import { ActionEnum } from '../../enums';

/** @deprecated Use PhoneCallRequestEventResponse instead */
export type CalloutRequestEventResponse = PhoneCallRequestEventResponse;

export interface PhoneCallRequestEventResponse {
  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see PhoneCallProperties */
  callout?: PhoneCallProperties;
}

/** @deprecated Use PhoneCallProperties instead */
export type CalloutProperties = PhoneCallProperties;

export interface PhoneCallProperties {
  /** The Phone Call PIN that should be entered by the user. Sinch servers automatically generate PIN codes for Phone Call verification. If you want to set your own code, you can specify it in the response to the Verification Request Event. */
  code?: string;
  /** @see SpeechProperties */
  speech?: SpeechProperties;
}

/**
 * An object defining various properties for the text-to-speech message.
 */
export interface SpeechProperties {
  /** Indicates the language that should be used for the text-to-speech message. Currently, only `en-US` is supported. */
  locale?: string;
}
