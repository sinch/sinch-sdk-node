import { ActionEnum } from '../../enums';

export interface SmsRequestEventResponse {
  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see SmsProperties */
  sms?: SmsProperties;
}

export interface SmsProperties {
  /** The SMS PIN that should be used. By default, the Sinch dashboard will automatically generate PIN codes for SMS verification. If you want to set your own PIN, you can specify it in the response to the Verification Request Event. */
  code?: string;
  /** List of strings */
  acceptLanguage?: string[];
}

/** @deprecated Use SmsRequestEventResponse instead */
export type SMSRequestEventResponse = SmsRequestEventResponse;

/** @deprecated Use SmsProperties instead */
export type SmsContent = SmsProperties;
