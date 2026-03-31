import { KakaoTalkImage } from '../kakaotalk-image';
import { KakaoTalkPricing } from '../kakaotalk-pricing';
import { KakaoTalkButton } from '../kakaotalk-button';
import { KakaoTalkCoupon } from '../kakaotalk-coupon';

export interface KakaoTalkMessage {
  /** Additional information */
  additional_content?: string;
  /** @see KakaoTalkCommerceImage */
  image: KakaoTalkImage;
  /** Product information */
  commerce?: KakaoTalkPricing;
  /** Buttons list */
  buttons: KakaoTalkButton[];
  /** Discount coupon */
  coupon?: KakaoTalkCoupon;
}
