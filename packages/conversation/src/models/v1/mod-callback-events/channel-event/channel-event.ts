import { ConversationChannel } from '../../conversation-channel';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is used to deliver notifications regarding channel-specific information and updates.
 * For example, if you are using the WhatsApp channel of the Conversation API, and your quality rating has been changed to GREEN, a POST would be made to the CHANNEL_EVENT webhook.
 */
export interface ChannelEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CHANNEL_EVENT';
  /** @see ChannelEventNotification */
  channel_event_notification?: ChannelEventNotification;
}

export interface ChannelEventNotification {
  channel_event: ChannelEventItem
}

export interface ChannelEventItem {
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The type of event being reported. */
  event_type?: string;
  /** An object containing additional information regarding the event. The contents of the object depend on the channel and the event_type. */
  additional_data?: object;
}
