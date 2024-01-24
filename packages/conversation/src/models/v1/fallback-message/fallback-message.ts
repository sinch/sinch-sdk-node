import { Reason } from '../reason';

/**
 * Fallback message. Used when original contact message can not be handled.
 */
export interface FallbackMessage {

  /** Optional. The raw fallback message if provided by the channel. */
  raw_message?: string;
  /** @see Reason */
  reason?: Reason;
}
