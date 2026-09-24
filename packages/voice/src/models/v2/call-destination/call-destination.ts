import { Phone } from '../phone';
import { Sip } from '../sip';
import { Stream } from '../stream';
import { VoiceRelay } from '../voice-relay';

/**
 * Call destination - Phone Number or Stream URI
 */
export type CallDestination = Phone | Sip | Stream | VoiceRelay;
