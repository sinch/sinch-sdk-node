import { PlayMessage } from '../play-message';
import { SayMessage } from '../say-message';

/**
 * A single message item. The required payload depends on `type`.
 */
export type Message = SayMessage | PlayMessage;
