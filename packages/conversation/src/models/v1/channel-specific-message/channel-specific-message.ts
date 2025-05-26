import { WhatsAppFlow } from '../whatsapp-flow';
import { WhatsAppPaymentOrderDetails } from '../whatsapp-payment-order-details';
import { WhatsAppPaymentOrderStatus } from '../whatsapp-payment-order-status';

/**
 * A message containing a channel specific message (not supported by OMNI types).
 */
export type ChannelSpecificMessage = WhatsAppFlowMessage
  | WhatsAppPaymentOrderDetailsMessage
  | WhatsAppPaymentOrderStatusMessage;

export interface WhatsAppFlowMessage {
  /** The type of the channel specific message. */
  message_type: 'FLOWS';
  /** @see WhatsAppFlow */
  message: WhatsAppFlow;
}

export interface WhatsAppPaymentOrderDetailsMessage {
  /** The type of the channel specific message. */
  message_type: 'ORDER_DETAILS';
  /** @see WhatsappPaymentOrderDetails */
  message: WhatsAppPaymentOrderDetails;
}

export interface WhatsAppPaymentOrderStatusMessage {
  /** The type of the channel specific message. */
  message_type: 'ORDER_STATUS';
  /** @see WhatsAppPaymentOrderStatus */
  message: WhatsAppPaymentOrderStatus;
}
