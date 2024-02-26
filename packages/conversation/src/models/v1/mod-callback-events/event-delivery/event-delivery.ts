import { ChannelIdentity } from '../../channel-identity';
import { Reason } from '../../reason';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { DeliveryStatus, ProcessingMode } from '../../enums';

export interface EventDelivery extends ConversationCallbackEvent{

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
  /** @see EventDeliveryEventDeliveryReport */
  event_delivery_report?: EventDeliveryReport;
  /** Name of the trigger responsible for this event. */
  trigger: 'EVENT_DELIVERY';
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
