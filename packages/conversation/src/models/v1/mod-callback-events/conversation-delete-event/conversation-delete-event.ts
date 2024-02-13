import { Conversation } from '../../conversation';
import { ConversationEvent } from '../conversation-event';

/**
 * This callback is sent when a conversation between the subscribed app and a contact is deleted.
 */
export interface ConversationDeleteEvent extends ConversationEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: string;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: string;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback\'s documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see ConversationNotification */
  conversation_delete_notification?: ConversationNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'CONVERSATION_DELETE';
}

/**
 * Object containing the details of the deleted conversation
 */
export interface ConversationNotification {

  /** @see Conversation */
  conversation?: Conversation;
}
