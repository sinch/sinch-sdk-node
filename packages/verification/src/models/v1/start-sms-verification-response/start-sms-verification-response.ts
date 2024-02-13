import { LinksObject } from '../links-object';

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

interface SmsContent {

  /** The expected template for the SMS response. */
  template?: string;
  /** The amount of time in seconds that the client should wait for the SMS. */
  interceptionTimeout?: number;
}
