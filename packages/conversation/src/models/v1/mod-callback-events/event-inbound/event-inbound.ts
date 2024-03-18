import { ChannelIdentity } from '../../channel-identity';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ProcessingMode } from '../../enums';
import { ContactEvent } from '../../contact-event';
import { ContactMessageEvent } from '../../contact-message-event';

export interface EventInbound extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'EVENT_INBOUND';
  /** @see EventInboundEvent */
  event?: EventInboundEvent;
}

export interface EventInboundEvent {
  /** The event ID. */
  id?: string;
  /** The direction of the event. It\'s always TO_APP for contact events. */
  direction?: 'TO_APP';
  /** @see ContactEvent */
  contact_event?: ContactEvent;
  /** @see ContactMessageEvent */
  contact_message_event?: ContactMessageEvent;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** The ID of the conversation this event is part of. Will be empty if processing_mode is DISPATCH. */
  conversation_id?: string;
  /** Timestamp marking when the channel callback was received by the Conversation API. */
  accept_time?: Date;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}
