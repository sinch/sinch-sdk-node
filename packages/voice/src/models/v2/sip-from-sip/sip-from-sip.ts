export interface SipFromSip {
  /** SIP URI of the originating endpoint. Both `sip:` (unencrypted) and `sips:` (TLS-encrypted) schemes are supported. */
  endpoint: string;
  /** Display name presented to the called party as the caller identity. Transmitted as the display name part of the SIP `From` header (for example, `Alice <sip:alice@example.com>`). */
  displayName?: string;
}
/** Validation regex for endpoint */
export const endpointPattern = /^sips?:/;
