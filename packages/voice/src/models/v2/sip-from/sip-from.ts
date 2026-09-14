import { SipFromDetails } from '../sip-from-details';

export interface SipFrom {
  /** Indicates the call originated from a SIP (Session Initiation Protocol) endpoint. */
  type: TypeEnum;
  /** @see SipFromDetails */
  sip: SipFromDetails;
}
export type TypeEnum = 'SIP' | string;
