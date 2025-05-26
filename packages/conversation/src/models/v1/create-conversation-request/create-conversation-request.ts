import { ConversationChannel } from '../conversation-channel';

/**
 * The conversation to create.
 */
export interface CreateConversationRequest {

  /** Flag for whether this conversation is active. */
  active?: boolean;
  /** @see ConversationChannel */
  active_channel?: ConversationChannel;
  /** The ID of the participating app. */
  app_id: string;
  /** The ID of the participating contact. */
  contact_id: string;
  /**
   * Arbitrary data set by the Conversation API clients. Up to 1024 characters long.
   * NOTE: This field has been deprecated due to changes in the system architecture or functionality.
   * @deprecated It is no longer actively maintained and may be removed in future versions. Please avoid relying on this field in new code.
   */
  metadata?: string;
  /** Arbitrary data set by the Conversation API clients and/or provided in the `conversation_metadata` field of a SendMessageRequest. A valid JSON object. */
  metadata_json?: object;
  /** Arbitrary correlation ID related to the MT message set by the Conversation API user. */
  correlation_id?: string;
}
