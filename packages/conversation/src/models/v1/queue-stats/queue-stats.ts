export interface QueueStats {

  /** The current size of the App\'s MT queue. */
  outbound_size?: number;
  /** The limit of the App\'s MT queue. The default limit is 500000 messages. */
  outbound_limit?: number;
}
