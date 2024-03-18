import { Conversation } from '../../conversation';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a conversation between the subscribed app and a contact is stopped.
 */
export interface ConversationStopEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONVERSATION_STOP';
  /** @see ConversationNotification */
  conversation_stop_notification?: ConversationNotification;
}

/**
 * Object containing the details of the stopped conversation
 */
export interface ConversationNotification {
  /** @see Conversation */
  conversation?: Conversation;
}
