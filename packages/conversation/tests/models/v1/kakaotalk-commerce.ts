import { KakaoTalkCommerce } from '../../../src/models';
import { kakaotalkAppLinkButton, kakaotalkWebLinkButton } from './kakaotalk-button';
import { kakaoTalkDiscountFixedCommerce } from './kakaotalk-pricing';
import { kakaoTalkDiscountRateCoupon } from './kakaotalk-coupon';
import { kakaoTalkImage } from './kakaotalk-image';

export const kakaotalkCommerceMessageContent = {
  push_alarm: false,
  adult: false,
  buttons: [
    kakaotalkWebLinkButton,
    kakaotalkAppLinkButton,
  ],
  additional_content: 'additional content',
  image: kakaoTalkImage,
  commerce: kakaoTalkDiscountFixedCommerce,
  coupon: kakaoTalkDiscountRateCoupon,
} satisfies KakaoTalkCommerce;
