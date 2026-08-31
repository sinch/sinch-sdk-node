import { SipSip } from '../sip-sip';

export interface Sip {
  /** Routes the call to a SIP (Session Initiation Protocol) endpoint. */
  type: TypeEnum;
  /** @see SipSip */
  sip: SipSip;
}
export type TypeEnum = 'SIP' | string;
