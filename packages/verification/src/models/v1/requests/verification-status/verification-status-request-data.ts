export interface VerificationStatusByIdRequestData {
  /** The ID of the verification. */
  'id': string;
}
export interface VerificationStatusByIdentityRequestData {
  /** For type `number` use a [E.164](https://support.sinch.com/hc/en-us/articles/52299961578771-E-164)-compatible phone number. */
  'endpoint': string;
  /** The method of the verification. */
  // TODO v2.0 - Remove 'callout' and 'flashCall' options
  'method': 'sms' | 'callout' | 'phonecall' | 'flashCall' | 'flashcall' | 'whatsapp' | string;
}
export interface VerificationStatusByReferenceRequestData {
  /** The custom reference of the verification. */
  'reference': string;
}
