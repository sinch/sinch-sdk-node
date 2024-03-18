import { MessageInboundEventItem } from '../message-inbound-event-item';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback delivers contact (end-user) messages to the API clients.
 */
export interface MessageInboundEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'MESSAGE_INBOUND';
  /** @see MessageInboundEventItem */
  message?: MessageInboundEventItem;
}
