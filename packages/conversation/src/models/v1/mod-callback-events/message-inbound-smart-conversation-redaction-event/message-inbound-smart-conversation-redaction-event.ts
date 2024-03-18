import { MessageInboundEventItem } from '../message-inbound-event-item';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback delivers contact (end-user) messages to the API clients. The content of the message goes through an A.I. analysis and is redacted if required.
 */
export interface MessageInboundSmartConversationRedactionEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'MESSAGE_INBOUND_SMART_CONVERSATION_REDACTION';
  /** @see MessageInboundEventItem */
  message_redaction?: MessageInboundEventItem;
}
