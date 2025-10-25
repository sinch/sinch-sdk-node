export type KakaoTalkCommerce
  = KakaoTalkRegularPriceCommerce
  | KakaoTalkDiscountFixedCommerce
  | KakaoTalkDiscountRateCommerce;

export interface KakaoTalkRegularPriceCommerce {
  /** Product title */
  title: string;
  /** Regular price of the product */
  regular_price: number;
}

export interface KakaoTalkDiscountFixedCommerce {
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
  /** Product title */
  title: string;
  /** Regular price of the product */
  regular_price: number;
  /** Discounted price of the product */
  discount_price: number;
  /** Discount rate (%) */
  discount_rate: number;
}
