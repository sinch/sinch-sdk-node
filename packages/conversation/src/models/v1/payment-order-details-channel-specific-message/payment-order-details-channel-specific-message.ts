import { WhatsAppInteractiveMessageBase } from '../whatsapp-interactive-message-base';

/**
 * A message type for sending WhatsApp Payment Requests.
 */
export interface PaymentOrderDetailsChannelSpecificMessage extends WhatsAppInteractiveMessageBase {
  /** @see PaymentOrderDetailsChannelSpecificMessagePayment */
  payment: PaymentOrderDetailsChannelSpecificMessagePayment;
}

/**
 * The payment order details content.
 */
export interface PaymentOrderDetailsChannelSpecificMessagePayment {
  /** The country/currency associated with the payment message. */
  type: 'br';
  /** Unique reference ID. */
  reference_id: string;
  /** The type of good associated with this order. */
  type_of_goods: 'digital-goods' | 'physical-goods';
  /** @see PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettings */
  payment_settings?: PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettings;
  /** Integer representing the total amount of the transaction. */
  total_amount_value: number;
  /** @see PaymentOrderDetailsChannelSpecificMessagePaymentOrder */
  order: PaymentOrderDetailsChannelSpecificMessagePaymentOrder;
}

/**
 * The payment order.
 */
export interface PaymentOrderDetailsChannelSpecificMessagePaymentOrder {
  /** Unique ID of the Facebook catalog being used by the business. */
  catalog_id?: string;
  /** Expiration timestamp for the order. */
  expiration_time?: Date;
  /** Description of the expiration. */
  expiration_description?: string;
  /** Value representing the subtotal amount of this order. */
  subtotal_value: number;
  /** Value representing the tax amount for this order. */
  tax_value: number;
  /** Description of the tax for this order. */
  tax_description?: string;
  /** Value representing the shipping amount for this order. */
  shipping_value?: number;
  /** Shipping description for this order. */
  shipping_description?: string;
  /** Value of the discount for this order. */
  discount_value?: number;
  /** Description of the discount for this order. */
  discount_description?: string;
  /** Discount program name for this order. */
  discount_program_name?: string;
  /** The items list for this order. */
  items: PaymentOrderDetailsChannelSpecificMessagePaymentOrderItems[];
}

export interface PaymentOrderDetailsChannelSpecificMessagePaymentOrderItems {
  /** Unique ID of the retailer. */
  retailer_id: string;
  /** Item's name as displayed to the user. */
  name: string;
  /** Price per item. */
  amount_value: number;
  /** Number of items in this order. */
  quantity: number;
  /** Discounted price per item. */
  sale_amount_value?: number;
}

/**
 * The payment settings.
 */
export interface PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettings {
  /** @see PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettingsDynamicPix */
  dynamic_pix: PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettingsDynamicPix;
}

/**
 * The dynamic Pix payment settings.
 */
export interface PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettingsDynamicPix {
  /** The dynamic Pix code to be used by the buyer to pay. */
  code: string;
  /** Account holder name. */
  merchant_name: string;
  /** Pix key. */
  key: string;
  /** Pix key type. */
  key_type: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP';
}
