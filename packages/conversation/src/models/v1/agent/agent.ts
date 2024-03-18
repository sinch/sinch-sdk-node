/**
 * Represents an agent that is involved in a conversation.
 */
export interface Agent {

  /** Agent's display name */
  display_name: string;
  /** Agent's classification. It can be UNKNOWN_AGENT_TYPE, HUMAN or BOT. */
  type: 'UNKNOWN_AGENT_TYPE' | 'HUMAN' | 'BOT';
  /** The Agent's picture url. */
  picture_url?: string;
}
