export type KakaoTalkCommerce
  = KakaoTalkRegularPriceCommerce
  | KakaoTalkDiscountFixedCommerce
  | KakaoTalkDiscountRateCommerce;

export interface KakaoTalkRegularPriceCommerce {
  /** Commerce with regular price */
  type: 'REGULAR_PRICE_COMMERCE';
  /** Product title */
  title: string;
  /** Regular price of the product */
  regular_price: number;
}

export interface KakaoTalkDiscountFixedCommerce {
  /** Commerce with fixed discount */
  type: 'FIXED_DISCOUNT_COMMERCE';
  /** Product title */
  title: string;
  /** Regular price of the product */
  regular_price: number;
  /** Discounted price of the product */
  discount_price: number;
  /** Fixed discount */
  discount_fixed: number;
}

export interface KakaoTalkDiscountRateCommerce {
  /** Commerce with percentage discount */
  type: 'PERCENTAGE_DISCOUNT_COMMERCE';
  /** Product title */
  title: string;
  /** Regular price of the product */
  regular_price: number;
  /** Discounted price of the product */
  discount_price: number;
  /** Discount rate (%) */
  discount_rate: number;
}
