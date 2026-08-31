import { SipFromSip } from '../sip-from-sip';

export interface SipFrom {
  /** Indicates the call originated from a SIP (Session Initiation Protocol) endpoint. */
  type: TypeEnum;
  /** @see SipFromSip */
  sip: SipFromSip;
}
export type TypeEnum = 'SIP' | string;
