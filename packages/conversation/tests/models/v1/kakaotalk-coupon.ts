import {
  KakaoTalkDiscountRateCoupon,
  KakaoTalkFixedDiscountCoupon,
  KakaoTalkFreeCoupon,
  KakaoTalkShippingDiscountCoupon,
  KakaoTalkUPCoupon,
} from '../../../src/models';

export const kakaoTalkFixedDiscountCoupon = {
  type: 'FIXED_DISCOUNT_COUPON',
  discount_fixed: 1000,
  description: 'description',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkFixedDiscountCoupon;

export const kakaoTalkDiscountRateCoupon = {
  type: 'PERCENTAGE_DISCOUNT_COUPON',
  discount_rate: 10,
  description: 'description',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkDiscountRateCoupon;

export const kakaoTalkShippingDiscountCoupon = {
  type: 'SHIPPING_DISCOUNT_COUPON',
  description: 'description',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkShippingDiscountCoupon;

export const kakaoTalkFreeCoupon = {
  type: 'FREE_COUPON',
  title: 'title',
  description: 'description',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkFreeCoupon;

export const kakaoTalkUPtCoupon = {
  type: 'UP_COUPON',
  title: 'title',
  description: 'description',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkUPCoupon;
