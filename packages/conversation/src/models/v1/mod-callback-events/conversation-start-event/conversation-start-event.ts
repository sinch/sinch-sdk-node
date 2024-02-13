import { Conversation } from '../../conversation';
import { ConversationEvent } from '../conversation-event';

/**
 * This callback is sent when a new conversation between the subscribed app and a contact is started.
 */
export interface ConversationStartEvent extends ConversationEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback's documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see Conversation */
  conversation_start_notification?: ConversationNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'CONVERSATION_START';
}

/**
 * Object containing the details of the started conversation
 */
export interface ConversationNotification {

  /** @see Conversation */
  conversation?: Conversation;
}
