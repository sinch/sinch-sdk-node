import { ConversationChannel } from '../conversation-channel';

/**
 * A collection of messages exchanged between a contact and an app. Conversations are normally created on the fly by Conversation API once a message is sent and there is no active conversation already. There can be only one active conversation at any given time between a particular contact and an app.
 */
export interface Conversation {

  /** Flag for whether this conversation is active. */
  active?: boolean;
  /** @see ConversationChannel */
  active_channel?: ConversationChannel;
  /** The ID of the participating app. */
  app_id?: string;
  /** The ID of the participating contact. */
  contact_id?: string;
  /** The ID of the conversation. */
  id?: string;
  /** The timestamp of the latest message in the conversation. The timestamp will be Thursday January 01, 1970 00:00:00 UTC if the conversation contains no messages. */
  last_received?: Date;
  /** Arbitrary data set by the Conversation API clients. Up to 1024 characters long. */
  metadata?: string;
  /** Arbitrary data set by the Conversation API clients and/or provided in the `conversation_metadata` field of a SendMessageRequest. A valid JSON object. */
  metadata_json?: object;
}
