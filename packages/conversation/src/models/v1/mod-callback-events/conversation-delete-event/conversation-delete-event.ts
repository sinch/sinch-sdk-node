import { Conversation } from '../../conversation';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a conversation between the subscribed app and a contact is deleted.
 */
export interface ConversationDeleteEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONVERSATION_DELETE';
  /** @see ConversationNotification */
  conversation_delete_notification?: ConversationNotification;
}

/**
 * Object containing the details of the deleted conversation
 */
export interface ConversationNotification {
  /** @see Conversation */
  conversation?: Conversation;
}
