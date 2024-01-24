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
  /** The ID of the conversation. */
  id?: string;
  /** Arbitrary data set by the Conversation API clients. Up to 1024 characters long. */
  metadata?: string;
  /** Arbitrary data set by the Conversation API clients and/or provided in the `conversation_metadata` field of a SendMessageRequest. A valid JSON object. */
  metadata_json?: object;
}
