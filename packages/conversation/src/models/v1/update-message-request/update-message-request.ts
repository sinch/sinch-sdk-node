/**
 * Update certain fields of a message. For now only metadata update is allowed.
 */
export interface UpdateMessageRequest {
  /** The new metadata value */
  metadata: string;
}
