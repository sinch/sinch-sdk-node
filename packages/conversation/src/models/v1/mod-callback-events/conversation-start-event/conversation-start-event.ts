import { Conversation } from '../../conversation';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a new conversation between the subscribed app and a contact is started.
 */
export interface ConversationStartEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONVERSATION_START';
  /** @see ConversationNotification */
  conversation_start_notification?: ConversationNotification;
}

/**
 * Object containing the details of the started conversation
 */
export interface ConversationNotification {
  /** @see Conversation */
  conversation?: Conversation;
}
