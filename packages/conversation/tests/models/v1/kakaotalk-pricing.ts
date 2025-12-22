import {
  KakaoTalkRegularPriceCommerce,
  KakaoTalkDiscountFixedCommerce,
  KakaoTalkDiscountRateCommerce,
} from '../../../src/models';

export const kakaoTalkRegularPriceCommerce = {
  type: 'REGULAR_PRICE_COMMERCE',
  title: 'title',
  regular_price: 1000,
} satisfies KakaoTalkRegularPriceCommerce;

export const kakaoTalkDiscountFixedCommerce = {
  type: 'FIXED_DISCOUNT_COMMERCE',
  title: 'title',
  regular_price: 1000,
  discount_price: 500,
  discount_fixed: 500,
} satisfies KakaoTalkDiscountFixedCommerce;

export const kakaoTalkDiscountRateCommerce = {
  type: 'PERCENTAGE_DISCOUNT_COMMERCE',
  title: 'title',
  regular_price: 1000,
  discount_price: 500,
  discount_rate: 50,
} satisfies KakaoTalkDiscountRateCommerce;
