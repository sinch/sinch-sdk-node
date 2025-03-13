import { WhatsAppInteractiveMessageBase } from '../whatsapp-interactive-message-base';

/**
 * A message type for sending WhatsApp Payment Status Requests.
 */
export interface PaymentOrderStatusChannelSpecificMessage extends WhatsAppInteractiveMessageBase{
  /** @see PaymentOrderStatusChannelSpecificMessagePayment */
  payment: PaymentOrderStatusChannelSpecificMessagePayment;
}

/**
 * The payment order status message content
 */
export interface PaymentOrderStatusChannelSpecificMessagePayment {
  /** Unique ID used to query the current payment status. */
  reference_id: string;
  /** @see PaymentOrderStatusChannelSpecificMessagePaymentOrder */
  order: PaymentOrderStatusChannelSpecificMessagePaymentOrder;
}

/**
 * The payment order.
 */
export interface PaymentOrderStatusChannelSpecificMessagePaymentOrder {
  /** The new payment message status. */
  status: 'pending' | 'processing' | 'partially-shipped' | 'shipped' | 'completed' | 'canceled';
  /** The description of payment message status update (120 characters maximum). */
  description?: string;
}
