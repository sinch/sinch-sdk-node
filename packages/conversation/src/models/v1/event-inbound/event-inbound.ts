import { ProcessingMode } from '../processing-mode';
import { ChannelIdentity } from '../channel-identity';

export interface EventInbound {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback\'s documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see EventInboundEvent */
  event?: EventInboundEvent;

  trigger: 'EVENT_INBOUND';
}

export interface EventInboundEvent {

  /** The event ID. */
  id?: string;
  /** The direction of the event. It\'s always TO_APP for contact events. */
  direction?: DirectionEnum;
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

export type DirectionEnum = 'TO_APP';

export interface ContactEvent {

  /** Empty object denoting the contact is composing a message. */
  composing_event?: object;
  /** @see CommentEvent */
  comment_event?: CommentEvent;
}

/**
 * Object which contains information of a comment made by a user outside  the main conversation context. Currently only supported on Instagram channel, see Instagram Private Replies for more details
 */
export interface CommentEvent {
  /** Event\'s ID */
  id?: string;
  /** Comment\'s text */
  text?: string;
  /** Either LIVE or FEED. Indicates the type of media on which the comment was made. */
  comment_type?: CommentTypeEnum;
  /** Instagram\'s URL of the live broadcast or the post on which the comment was made (permalink). */
  commented_on?: string;
  /** Username of the account that commented in the live broadcast or post. */
  user?: string;
}
export type CommentTypeEnum = 'FEED' | 'LIVE';

/**
 * The content of the event when contact_event is not populated. Note that this object is currently only available to select customers for beta testing. Mutually exclusive with contact_event.
 */
export interface ContactMessageEvent {

  /** @see ContactMessageEventPaymentStatusUpdateEvent */
  payment_status_update_event?: PaymentStatusUpdateEvent;
}

/**
 * Object reflecting the current state of a particular payment flow.
 */
export interface PaymentStatusUpdateEvent {

  /** Unique identifier for the corresponding payment of a particular order. */
  reference_id?: string;
  /** The stage the payment has reached within the payment flow. */
  payment_status?: PaymentStatusEnum;
  /** The status of the stage detailed in payment_status. */
  payment_transaction_status?: PaymentTransactionStatusEnum;
  /** Unique identifier of the payment_transaction_status. */
  payment_transaction_id?: string;
}
export type PaymentStatusEnum =
  'PAYMENT_STATUS_UNKNOWN'
  | 'PAYMENT_STATUS_NEW'
  | 'PAYMENT_STATUS_PENDING'
  | 'PAYMENT_STATUS_CAPTURED'
  | 'PAYMENT_STATUS_CANCELED'
  | 'PAYMENT_STATUS_FAILED';

export type PaymentTransactionStatusEnum =
  'PAYMENT_STATUS_TRANSACTION_UNKNOWN'
  | 'PAYMENT_STATUS_TRANSACTION_PENDING'
  | 'PAYMENT_STATUS_TRANSACTION_FAILED'
  | 'PAYMENT_STATUS_TRANSACTION_SUCCESS'
  | 'PAYMENT_STATUS_TRANSACTION_CANCELED';
