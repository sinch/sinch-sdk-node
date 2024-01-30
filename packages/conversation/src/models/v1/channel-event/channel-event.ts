import { ConversationChannel } from '../conversation-channel';

/**
 * This callback is used to deliver notifications regarding channel-specific information and updates. For example, if your are using the WhatsApp channel of the Conversation API, and your quality rating has been changed to GREEN, a POST would be made to the CHANNEL_EVENT webhook.
 */
export interface ChannelEvent {

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
  /** @see ChannelEventNotification */
  channel_event_notification?: ChannelEventNotification;

  trigger: 'CHANNEL_EVENT';
}

export interface ChannelEventNotification {

  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The type of event being reported. */
  event_type?: string;
  /** An object containing additional information regarding the event. The contents of the object depend on the channel and the event_type. */
  additional_data?: object;
}
