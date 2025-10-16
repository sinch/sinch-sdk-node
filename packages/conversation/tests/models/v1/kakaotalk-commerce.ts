import {
  KakaoTalkRegularPriceCommerce,
  KakaoTalkDiscountFixedCommerce,
  KakaoTalkDiscountRateCommerce,
} from '../../../src/models';

export const kakaoTalkRegularPriceCommerce = {
  title: 'title',
  regular_price: 1000,
} satisfies KakaoTalkRegularPriceCommerce;

export const kakaoTalkDiscountFixedCommerce = {
  title: 'title',
  regular_price: 1000,
  discount_price: 500,
  discount_fixed: 500,
} satisfies KakaoTalkDiscountFixedCommerce;

export const kakaoTalkDiscountRateCommerce = {
  title: 'title',
  regular_price: 1000,
  discount_price: 500,
  discount_rate: 50,
} satisfies KakaoTalkDiscountRateCommerce;
