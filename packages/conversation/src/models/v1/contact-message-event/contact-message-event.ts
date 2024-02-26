/**
 * The content of the event when contact_event is not populated. Note that this object is currently only available to select customers for beta testing. Mutually exclusive with contact_event.
 */
export interface ContactMessageEvent {

  /** Object reflecting the current state of a particular payment flow. */
  payment_status_update_event?: PaymentStatusUpdateEvent;
}

interface PaymentStatusUpdateEvent {

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
