export interface VerificationStatusByIdRequestData {
  /** The ID of the verification. */
  'id': string;
}
export interface VerificationStatusByIdentityRequestData {
  /** For type `number` use a [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537)-compatible phone number. */
  'endpoint': string;
  /** The method of the verification. */
  'method': 'sms' | 'callout' | 'flashcall';
}
export interface VerificationStatusByReferenceRequestData {
  /** The custom reference of the verification. */
  'reference': string;
}
