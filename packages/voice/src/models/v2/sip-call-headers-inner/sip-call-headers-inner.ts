export interface SipCallHeadersInner {
  /** Name of the SIP header. */
  key: string;
  /** Value of the SIP header. */
  value?: string;
}
/** Validation regex for key */
export const keyPattern = /^[-A-Za-z0-9.!%*_+`'~]+$/;
