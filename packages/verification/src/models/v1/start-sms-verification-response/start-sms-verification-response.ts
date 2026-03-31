import { LinksObject } from '../links-object';
import { WithAdditionalProperties } from '@sinch/sdk-client';
import { CodeType } from '../enums';

export interface StartSmsVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For SMS Verifications, this will always be `sms`. */
  method?: 'sms';
  /** The response contains the `template` of the SMS to be expected and intercepted. */
  sms?: SmsContent;
  /** @see LinksObject */
  _links?: LinksObject[];
}

interface SmsContent extends WithAdditionalProperties {

  /** The expected template for the SMS response. */
  template?: string;
  /** The amount of time in seconds that the client should wait for the SMS. */
  interceptionTimeout?: number;
  /** Accepted values for the type of code to be generated are `Numeric`, `Alpha`, and `Alphanumeric`. Default is `Numeric`. */
  codeType?: CodeType;
}
