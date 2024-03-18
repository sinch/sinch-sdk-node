import { ChannelIdentity } from '../../channel-identity';
import { Reason } from '../../reason';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { DeliveryStatus, ProcessingMode } from '../../enums';

/**
 * This callback notifies the API clients about status changes of already sent app message.
 */
export interface MessageDeliveryReceiptEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'MESSAGE_DELIVERY';
  /** @see MessageDeliveryReport */
  message_delivery_report?: MessageDeliveryReport;
}

export interface MessageDeliveryReport {
  /** The ID of the app message. */
  message_id?: string;
  /** The ID of the conversation the app message is part of. Will be empty if processing_mode is DISPATCH. */
  conversation_id?: string;
  /** The delivery status */
  status?: DeliveryStatus;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see Reason */
  reason?: Reason;
  /** Metadata specified in the message_metadata field of a Send Message request, if any. */
  metadata?: string;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}
