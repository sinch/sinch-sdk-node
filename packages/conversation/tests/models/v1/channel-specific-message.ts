import {
  WhatsAppFlowMessage,
  WhatsAppPaymentOrderDetailsMessage,
  WhatsAppPaymentOrderStatusMessage,
} from '../../../src/models';
import {
  KakaoTalkCarouselCommerceMessage,
  KakaoTalkCommerceMessage,
} from '../../../src/models/v1/channel-specific-message/channel-specific-message';

export const whatsAppFlowMessage = {
  message_type: 'FLOWS',
  message: {
    flow_id: '1234567890',
    flow_token: 'generated_token_123',
    flow_mode: 'published',
    flow_cta: 'Start Now',
    flow_action: 'navigate',
    flow_action_payload: {
      screen: 'entry_screen_1',
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    },
  },
} satisfies WhatsAppFlowMessage;


export const whatsAppPaymentOrderDetailsMessage = {
  message_type: 'ORDER_DETAILS',
  message: {
    payment: {
      type: 'br',
      reference_id: 'order_ref_123',
      type_of_goods: 'physical-goods',
      payment_settings: {},
      total_amount_value: 15000,
      order: {
        catalog_id: 'catalog_123',
        expiration_time: '1711929600',
        expiration_description: 'Order expires in 24 hours',
        subtotal_value: 13000,
        tax_value: 2000,
        tax_description: 'VAT',
        shipping_value: 0,
        shipping_description: 'Free Shipping',
        discount_value: 0,
        discount_description: '',
        discount_program_name: '',
        items: [
          {
            retailer_id: 'retailer_123',
            name: 'Product 1',
            amount_value: 5000,
            quantity: 1,
            sale_amount_value: 5000,
          },
          {
            retailer_id: 'retailer_123',
            name: 'Product 2',
            amount_value: 8000,
            quantity: 1,
            sale_amount_value: 8000,
          },
        ],
      },
    },
  },
} satisfies WhatsAppPaymentOrderDetailsMessage;

export const whatsAppPaymentOrderStatusMessage = {
  message_type: 'ORDER_STATUS',
  message: {
    payment: {
      reference_id: 'order_ref_123',
      order: {
        status: 'shipped',
        description: 'Order shipped',
      },
    },
  },
} satisfies WhatsAppPaymentOrderStatusMessage;

export const kakaoTalkCommerceMessage = {
  message_type: 'COMMERCE',
  message: {
    image: {
      image_url: 'https://example.com/image.jpg',
      image_link: 'https://example.com',
    },
    commerce: {
      title: 'Product 1',
      regular_price: 10000,
      discount_price: 5000,
      discount_fixed: 1000,
      discount_rate: 10,
    },
    buttons: [
      {
        type: 'WL',
        name: 'Buy Now',
        link_mo: 'https://example.com/buy',
        link_pc: 'https://example.com/buy',
      },
      {
        type: 'AL',
        name: 'Open App',
        scheme_ios: 'exampleapp://open',
        scheme_android: 'exampleapp://open',
      },
    ],
    additional_content: 'Limited time offer!',
    adult: false,
    push_alarm: false,
  },
} satisfies KakaoTalkCommerceMessage;

export const kakaoTalkCarouselCommerceMessage = {
  message_type: 'CAROUSEL_COMMERCE',
  message: {
    carousel: {
      list: [
        {
          image_url: 'https://example.com/image.jpg',
          buttons: [
            {
              type: 'WL',
              name: 'Buy Now',
              link_mo: 'https://example.com/buy',
              link_pc: 'https://example.com/buy',
            },
          ],
        },
      ],
    },
    adult: false,
    push_alarm: false,
  },
} satisfies KakaoTalkCarouselCommerceMessage;
