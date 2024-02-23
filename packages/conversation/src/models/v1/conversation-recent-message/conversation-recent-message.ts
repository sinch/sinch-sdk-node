import { Conversation } from '../conversation';
import { ConversationMessage } from '../conversation-message';

export interface ConversationRecentMessage {

  /** @see Conversation */
  conversation?: Conversation;
  /** @see ConversationMessage */
  last_message?: ConversationMessage;
}
