/**
 * The content of the event when contact_event is not populated. Note that this object is currently only available to select customers for beta testing. Mutually exclusive with contact_event.
 */
export type ContactMessageEvent =
  PaymentStatusUpdateEventOneOf
  | ShortLinkActivatedEventOneOf
  | ReactionEventOneOf;

export interface PaymentStatusUpdateEventOneOf {
  /** Object reflecting the current state of a particular payment flow. */
  payment_status_update_event?: PaymentStatusUpdateEvent;
  shortlink_activated_event?: never;
  reaction_event?: never;
}

export interface ShortLinkActivatedEventOneOf {
  /** Object reflecting an event that is created when a contact visits a shortlink. Currently, this is only supported for the Messenger and Instagram channels. */
  shortlink_activated_event?: ShortLinkActivatedEvent;
  payment_status_update_event?: never;
  reaction_event?: never;
}

export interface ReactionEventOneOf {
  /** Object reflecting an event that is created when a contact reacts/unreacts with an emoji to a particular MT message. Currently, this is only supported for the Messenger and Instagram channels. */
  reaction_event?: ReactionEvent;
  payment_status_update_event?: never;
  shortlink_activated_event?: never;
}

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

type PaymentStatusEnum =
  'PAYMENT_STATUS_UNKNOWN'
  | 'PAYMENT_STATUS_NEW'
  | 'PAYMENT_STATUS_PENDING'
  | 'PAYMENT_STATUS_CAPTURED'
  | 'PAYMENT_STATUS_CANCELED'
  | 'PAYMENT_STATUS_FAILED';

type PaymentTransactionStatusEnum =
  'PAYMENT_STATUS_TRANSACTION_UNKNOWN'
  | 'PAYMENT_STATUS_TRANSACTION_PENDING'
  | 'PAYMENT_STATUS_TRANSACTION_FAILED'
  | 'PAYMENT_STATUS_TRANSACTION_SUCCESS'
  | 'PAYMENT_STATUS_TRANSACTION_CANCELED';

/**
 * Object reflecting an event that is created when a contact visits a shortlink. Currently, this is only supported for the Messenger and Instagram channels. See [Shortlink Activated Event](https://developers.sinch.com/docs/conversation/callbacks/#shortlink-activated-event) for more details.
 */
export interface ShortLinkActivatedEvent {
  /** Refers to the payload previously configured to be sent in the postback. */
  payload?: string;
  /** Only relevant for the Instagram channel. */
  title?: string;
  /** The ref parameter from the shortlink the user visited. */
  ref?: string;
  /** Defaults to "SHORTLINK" for this type of event. */
  source?: string;
  /** The identifier for the referral. For Instagram and Messenger shortlinks, this is always set to "OPEN_THREAD". */
  type?: string;
  /** Set to true if target channel's conversation thread already existed at the moment the shortlink was visited. Set to false if a new conversation thread began when the shortlink was visited. */
  existing_thread?: boolean;
}

/**
 * Object reflecting an event that is created when a contact reacts/unreacts with an emoji to a particular MT message. Currently, this is only supported for the Messenger and Instagram channels. See [Reaction Event](https://developers.sinch.com/docs/conversation/callbacks/#reaction-event) for more details.
 */
export interface ReactionEvent {
  /** Indicates that an emoji reaction was placed on a message. This value is the string representation of the emoji. For example: "\u{2764}\u{FE0F}" */
  emoji: string;
  /** Type of action */
  action: 'REACTION_ACTION_UNKNOWN' | 'REACTION_ACTION_REACT' | 'REACTION_ACTION_UNREACT';
  /** The ID of the MT message that this reaction is associated with. */
  message_id: string;
  /** If present, represents the grouping of emojis. Example values: "smile", "angry", "sad", "wow", "love", "like", "dislike", "other" */
  reaction_category?: string;
}
