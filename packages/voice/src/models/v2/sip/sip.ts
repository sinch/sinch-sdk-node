import { SipDetails } from '../sip-details';

export interface Sip {
  /** Routes the call to a SIP (Session Initiation Protocol) endpoint. */
  type: TypeEnum;
  /** @see SipDetails */
  sip: SipDetails;
}
export type TypeEnum = 'SIP' | string;
