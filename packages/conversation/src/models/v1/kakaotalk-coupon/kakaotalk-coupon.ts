export type KakaoTalkCoupon =
  KakaoTalkFixedDiscountCoupon
  | KakaoTalkDiscountRateCoupon
  | KakaoTalkShippingDiscountCoupon
  | KakaoTalkFreeCoupon
  | KakaoTalkUPCoupon;

export interface KakaoTalkCouponBase {
  /** Coupon description */
  description?: string;
  /** Coupon URL opened on a mobile device */
  link_mo?: string;
  /** Coupon URL opened on a desktop device */
  link_pc?: string;
  /** Channel coupon URL (format: alimtalk=coupon://...) */
  scheme_android?: string;
  /** Channel coupon URL (format: alimtalk=coupon://...) */
  scheme_ios?: string;
}

export interface KakaoTalkFixedDiscountCoupon extends KakaoTalkCouponBase {
  /** Coupon type */
  type: 'FIXED_DISCOUNT_COUPON';
  /** Fixed discount */
  discount_fixed: number;
}

export interface KakaoTalkDiscountRateCoupon extends KakaoTalkCouponBase {
  /** Coupon type */
  type: 'PERCENTAGE_DISCOUNT_COUPON';
  /** Discount rate (%) */
  discount_rate: number;
}

export interface KakaoTalkShippingDiscountCoupon extends KakaoTalkCouponBase {
  /** Coupon type */
  type: 'SHIPPING_DISCOUNT_COUPON';
}

export interface KakaoTalkFreeCoupon extends KakaoTalkCouponBase {
  /** Coupon type */
  type: 'FREE_COUPON';
  /** Coupon title */
  title: string;
}

export interface KakaoTalkUPCoupon extends KakaoTalkCouponBase {
  /** Coupon type */
  type: 'UP_COUPON';
  /** Coupon title */
  title: string;
}
