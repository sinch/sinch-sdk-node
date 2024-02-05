/**
 * If you are including the Apple Business Chat channel in the `channel_identifier` property, you must include this object.
 */
export interface AppleBcCredentials {

  /** The ID that identifies a Business Chat Account (BCA). */
  business_chat_account_id: string;
  /** Required if our client wants to use Apple Pay. */
  merchant_id?: string;
  /** Required if our client wants to use Apple Pay. */
  apple_pay_certificate_reference?: string;
  /** Required if our client wants to use Apple Pay. */
  apple_pay_certificate_password?: string;
}
