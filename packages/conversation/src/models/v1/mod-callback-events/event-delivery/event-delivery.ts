import { ChannelIdentity } from '../../channel-identity';
import { Reason } from '../../reason';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { DeliveryStatus, ProcessingMode } from '../../enums';

export interface EventDelivery extends ConversationCallbackEvent{
  /** Name of the trigger responsible for this event. */
  trigger: 'EVENT_DELIVERY';
  /** @see EventDeliveryReport */
  event_delivery_report?: EventDeliveryReport;
}

export interface EventDeliveryReport {
  /** The ID of the app event. */
  event_id?: string;
  /** Shows the status of the message or event delivery */
  status?: DeliveryStatus;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see Reason */
  reason?: Reason;
  /** Metadata specified when sending the event if any. */
  metadata?: string;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}
