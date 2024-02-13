import { ChannelIdentity } from '../../channel-identity';
import { Reason } from '../../reason';
import { ConversationEvent } from '../conversation-event';
import { DeliveryStatus, ProcessingMode } from '../../enums';

/**
 * This callback notifies the API clients about status changes of already sent app message.
 */
export interface MessageDeliveryReceiptEvent extends ConversationEvent {

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
  /** @see MessageDeliveryReceiptEventMessageDeliveryReport */
  message_delivery_report?: MessageDeliveryReport;
  /** Name of the trigger responsible for this event. */
  trigger: 'MESSAGE_DELIVERY';
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
