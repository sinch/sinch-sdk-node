import { WhatsAppInteractiveMessageBase } from '../whatsapp-interactive-message-base';

/** @deprecated */
export type PaymentOrderStatusChannelSpecificMessage = WhatsAppPaymentOrderStatus;

/**
 * A message type for sending WhatsApp Payment Status Requests.
 */
export interface WhatsAppPaymentOrderStatus extends WhatsAppInteractiveMessageBase{
  /** @see OrderStatusPayment */
  payment: OrderStatusPayment;
}

/** @deprecated */
export type PaymentOrderStatusChannelSpecificMessagePayment = OrderStatusPayment;

/**
 * The payment order status message content
 */
export interface OrderStatusPayment {
  /** Unique ID used to query the current payment status. */
  reference_id: string;
  /** @see OrderStatusPaymentDetails */
  order: OrderStatusPaymentDetails;
}

/** @deprecated */
export type PaymentOrderStatusChannelSpecificMessagePaymentOrder = OrderStatusPaymentDetails;

/**
 * The payment order.
 */
export interface OrderStatusPaymentDetails {
  /** The new payment message status. */
  status: 'pending' | 'processing' | 'partially-shipped' | 'shipped' | 'completed' | 'canceled';
  /** The description of payment message status update (120 characters maximum). */
  description?: string;
}
