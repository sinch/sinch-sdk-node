import { WhatsAppFlow } from '../whatsapp-flow';
import { WhatsAppPaymentOrderDetails } from '../whatsapp-payment-order-details';
import { WhatsAppPaymentOrderStatus } from '../whatsapp-payment-order-status';
import { KakaoTalkCommerceMessageContent } from '../kakaotalk-commerce-message-content';
import { KakaoTalkCarouselCommerceMessageContent } from '../kakaotalk-carousel-commerce-message-content';

/**
 * A message containing a channel specific message (not supported by OMNI types).
 */
export type ChannelSpecificMessage = WhatsAppFlowMessage
  | WhatsAppPaymentOrderDetailsMessage
  | WhatsAppPaymentOrderStatusMessage
  | KakaoTalkCommerceMessage
  | KakaoTalkCarouselCommerceMessage;

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

export interface KakaoTalkCommerceMessage {
  /** The type of the channel specific message. */
  message_type: 'COMMERCE';
  /** @see KakaoTalkCommerceMessageContent */
  message: KakaoTalkCommerceMessageContent;
}

export interface KakaoTalkCarouselCommerceMessage {
  /** The type of the channel specific message. */
  message_type: 'CAROUSEL_COMMERCE';
  /** @see KakaoTalkCarouselCommerceMessageContent */
  message: KakaoTalkCarouselCommerceMessageContent;
}
