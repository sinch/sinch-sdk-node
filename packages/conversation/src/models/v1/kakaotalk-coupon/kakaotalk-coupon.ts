export type KakaoTalkCoupon =
  KakaoTalkFixedDiscountCoupon
  | KakaoTalkDiscountRateCoupon
  | KakaoTalkShippingDiscountCoupon
  | KakaoTalkFreeCoupon
  | KakaoTalkUPCoupon;

export interface KakaoTalkFixedDiscountCoupon {
  /** Coupon type */
  type: 'FIXED_DISCOUNT_COUPON';
  /** Fixed discount */
  discount_fixed: number;
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

export interface KakaoTalkDiscountRateCoupon {
  /** Coupon type */
  type: 'PERCENTAGE_DISCOUNT_COUPON';
  /** Discount rate (%) */
  discount_rate: number;
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

export interface KakaoTalkShippingDiscountCoupon {
  /** Coupon type */
  type: 'SHIPPING_DISCOUNT_COUPON';
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

export interface KakaoTalkFreeCoupon {
  /** Coupon type */
  type: 'FREE_COUPON';
  /** Coupon title */
  title: string;
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

export interface KakaoTalkUPCoupon {
  /** Coupon type */
  type: 'UP_COUPON';
  /** Coupon title */
  title: string;
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
