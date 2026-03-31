import { WhatsAppFlow } from '../whatsapp-flow';
import { WhatsAppPaymentOrderDetails } from '../whatsapp-payment-order-details';
import { WhatsAppPaymentOrderStatus } from '../whatsapp-payment-order-status';
import { KakaoTalkCommerce } from '../kakaotalk-commerce';
import { KakaoTalkCarouselCommerce } from '../kakaotalk-carousel-commerce';
import { LineNotificationTemplate } from '../line-notification-template';

/**
 * A message containing a channel specific message (not supported by OMNI types).
 */
export type ChannelSpecificMessage = WhatsAppFlowMessage
  | WhatsAppPaymentOrderDetailsMessage
  | WhatsAppPaymentOrderStatusMessage
  | KakaoTalkCommerceMessage
  | KakaoTalkCarouselCommerceMessage
  | LineNotificationTemplateMessage;

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
  /** @see KakaoTalkCommerce */
  message: KakaoTalkCommerce;
}

export interface KakaoTalkCarouselCommerceMessage {
  /** The type of the channel specific message. */
  message_type: 'CAROUSEL_COMMERCE';
  /** @see KakaoTalkCarouselCommerce */
  message: KakaoTalkCarouselCommerce;
}

export interface LineNotificationTemplateMessage {
  /** The type of the channel specific message. */
  message_type: 'NOTIFICATION_MESSAGE_TEMPLATE';
  /** @see LineNotificationTemplate */
  message: LineNotificationTemplate;
}
