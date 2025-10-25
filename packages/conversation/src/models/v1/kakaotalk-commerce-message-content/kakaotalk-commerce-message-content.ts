import { KakaoTalkButton } from '../kakaotalk-button';
import { KakaoTalkImage } from '../kakaotalk-image';
import { KakaoTalkCommerce } from '../kakaotalk-commerce';
import { KakaoTalkCoupon } from '../kakaotalk-coupon';

export interface KakaoTalkCommerceMessageContent {
  /** Set to `true` if a push alarm should be sent to a device. */
  push_alarm?: boolean;
  /** Set to `true` if a message contains adult content. Set to `false` by default. */
  adult?: boolean;
  /** Buttons list */
  buttons: KakaoTalkButton[];
  /** Additional information */
  additional_content?: string;
  /** @see KakaoTalkCommerceImage */
  image: KakaoTalkImage;
  /** @see KakaoTalkCommerceCommerce */
  commerce: KakaoTalkCommerce;
  /** @see KakaoTalkCommerceCoupon */
  coupon?: KakaoTalkCoupon;
}
