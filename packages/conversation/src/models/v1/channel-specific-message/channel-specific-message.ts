import { FlowChannelSpecificMessage } from '../flow-channel-specific-message';
import { PaymentOrderDetailsChannelSpecificMessage } from '../payment-order-details-channel-specific-message';
import { PaymentOrderStatusChannelSpecificMessage } from '../payment-order-status-channel-specific-message';

/**
 * A message containing a channel specific message (not supported by OMNI types).
 */
export type ChannelSpecificMessage = WhatsAppFlowMessage
  | WhatsAppPaymentOrderDetailsMessage
  | WhatsAppPaymentOrderStatusMessage;

export interface WhatsAppFlowMessage {
  /** The type of the channel specific message. */
  message_type: 'FLOWS';
  /** @see FlowChannelSpecificMessage */
  message: FlowChannelSpecificMessage;
}

export interface WhatsAppPaymentOrderDetailsMessage {
  /** The type of the channel specific message. */
  message_type: 'ORDER_DETAILS';
  /** @see PaymentOrderDetailsChannelSpecificMessage */
  message: PaymentOrderDetailsChannelSpecificMessage;
}

export interface WhatsAppPaymentOrderStatusMessage {
  /** The type of the channel specific message. */
  message_type: 'ORDER_STATUS';
  /** @see PaymentOrderStatusChannelSpecificMessage */
  message: PaymentOrderStatusChannelSpecificMessage;
}
