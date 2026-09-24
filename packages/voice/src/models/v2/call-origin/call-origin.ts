import { Phone } from '../phone';
import { SipFrom } from '../sip-from';

/**
 * Call origin - Phone Number or SIP endpoint
 */
export type CallOrigin = Phone | SipFrom;
