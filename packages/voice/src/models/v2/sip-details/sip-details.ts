import { SipCallHeadersInner } from '../sip-call-headers-inner';

export interface SipDetails {
  /** SIP URI of the destination endpoint. Both `sip:` (unencrypted) and `sips:` (TLS-encrypted) schemes are supported. */
  endpoint: string;
  /** Transport protocol to use for the SIP signalling channel.  If omitted, the platform selects a default based on the URI scheme: `UDP` for `sip:` and `TLS` for `sips:`. Setting this explicitly overrides that default — for example, to force `TCP` for a `sip:` URI or to use `TLS` without switching to the `sips:` scheme. */
  transport?: TransportEnum;
  /** Custom SIP headers to be sent in the call setup. */
  callHeaders?: SipCallHeadersInner[];
}
export type TransportEnum = 'UDP' | 'TCP' | 'TLS' | string;
/** Validation regex for endpoint */
export const endpointPattern = /^sips?:/;
