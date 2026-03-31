import { WhatsAppInteractiveMessageBase } from '../whatsapp-interactive-message-base';

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessage = WhatsAppPaymentOrderDetails;

/**
 * A message type for sending WhatsApp Payment Requests.
 */
export interface WhatsAppPaymentOrderDetails extends WhatsAppInteractiveMessageBase {
  /** @see OrderDetailsPayment */
  payment: OrderDetailsPayment;
}

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessagePayment = OrderDetailsPayment;

/**
 * The payment order details content.
 */
export interface OrderDetailsPayment {
  /** The country/currency associated with the payment message. */
  type: 'br' | 'sg' | string;
  /** Unique reference ID. */
  reference_id: string;
  /** The type of good associated with this order. */
  type_of_goods: 'digital-goods' | 'physical-goods' | string;
  /** @deprecated Use `payment_buttons` instead
   * @see OrderDetailsPaymentSettings */
  payment_settings?: OrderDetailsPaymentSettings;
  /** Array of payment buttons (1 to 2 items). */
  payment_buttons?: OrderDetailsPaymentButton[];
  /** Integer representing the total amount of the transaction. */
  total_amount_value: number;
  /** @see OrderDetailsPaymentOrder */
  order: OrderDetailsPaymentOrder;
}

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessagePaymentOrder = OrderDetailsPaymentOrder;

/**
 * The payment order.
 */
export interface OrderDetailsPaymentOrder {
  /** Unique ID of the Facebook catalog being used by the business. */
  catalog_id?: string;
  /** UTC timestamp indicating when the order should expire. The timestamp must be given in seconds. The minimum threshold for the timestamp is 300 seconds.*/
  // TODO v2: expose this property as a Date object
  expiration_time?: string;
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
  items: OrderDetailsPaymentOrderItems[];
}

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessagePaymentOrderItems = OrderDetailsPaymentOrderItems;

export interface OrderDetailsPaymentOrderItems {
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

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettings = OrderDetailsPaymentButton;

/**
 * The payment settings.
 * @deprecated
 */
export interface OrderDetailsPaymentSettings {
  /** @see DynamicPix */
  dynamic_pix: DynamicPix;
}

export type OrderDetailsPaymentButton =
  DynamicPix
  | PaymentLink
  | Boleto;

/** @deprecated */
export type PaymentOrderDetailsChannelSpecificMessagePaymentPaymentSettingsDynamicPix
  = DynamicPix;

/**
 * The dynamic Pix payment settings.
 */
export interface DynamicPix {
  /** The dynamic Pix code button identifier */
  type: 'pix_dynamic_code';
  /** The dynamic Pix code to be used by the buyer to pay. */
  code: string;
  /** Account holder name. */
  merchant_name: string;
  /** Pix key. */
  key: string;
  /** Pix key type. */
  key_type: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP' | string;
}

export interface PaymentLink {
  /** The payment link button identifier */
  type: 'payment_link';
  /** The payment link to be used by the buyer to pay. */
  uri: string;
}

export interface Boleto {
  /** The Boleto button identifier */
  type: 'boleto';
  /** The Boleto digitable line which will be copied to the clipboard when the user taps the Boleto button. */
  digitable_line: string;
}
