import { ActionEnum, CodeType } from '../../enums';
import { WithAdditionalProperties } from '@sinch/sdk-client';

export interface SmsRequestEventResponse {
  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see SmsProperties */
  sms?: SmsProperties;
}

export interface SmsProperties extends WithAdditionalProperties {
  /** The SMS OTP that should be used. By default, the Sinch dashboard will automatically generate OTP codes for SMS verification. If you want to set your own OTP, you can specify it in the response to the Verification Request Event. */
  code?: string;
  /** List of strings */
  acceptLanguage?: string[];
  /** Accepted values for the type of code to be generated are `Numeric`, `Alpha`, and `Alphanumeric`. Default is `Numeric`. */
  codeType?: CodeType;
  /** The expiration time for a verification process is represented in the format `HH:MM:SS`. */
  expiry?: string;
}

/** @deprecated Use SmsRequestEventResponse instead */
export type SMSRequestEventResponse = SmsRequestEventResponse;

/** @deprecated Use SmsProperties instead */
export type SmsContent = SmsProperties;
