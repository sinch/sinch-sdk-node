import {
  KakaoTalkCarousel,
  KakaoTalkCarouselHead,
  KakaoTalkCarouselTail,
  KakaoTalkMessage,
} from '../../../src/models';
import { kakaotalkAppLinkButton, kakaotalkWebLinkButton } from './kakaotalk-button';
import { kakaoTalkRegularPriceCommerce } from './kakaotalk-pricing';
import { kakaoTalkFixedDiscountCoupon } from './kakaotalk-coupon';

export const kakaoTalkCarouselHead = {
  header: 'header text',
  content: 'content text',
  image_url: 'https://example.com/image.png',
  link_mo: 'https://example.com/mobile',
  link_pc: 'https://example.com/desktop',
  scheme_ios: 'exampleapp://ios',
  scheme_android: 'exampleapp://android',
} satisfies KakaoTalkCarouselHead;

export const kakaotalkCarouselTail = {
  link_mo: 'https://example.com/more-mobile',
  link_pc: 'https://example.com/more-desktop',
  scheme_ios: 'exampleapp://more-ios',
  scheme_android: 'exampleapp://more-android',
} satisfies KakaoTalkCarouselTail;

export const kakaotalkCarouselListItem1 = {
  additional_content: 'additional content',
  image: {
    image_url: 'https://example.com/image.png',
    image_link: 'https://example.com',
  },
  commerce: kakaoTalkRegularPriceCommerce,
  buttons: [
    kakaotalkWebLinkButton,
    kakaotalkAppLinkButton,
  ],
  coupon: kakaoTalkFixedDiscountCoupon,
} satisfies KakaoTalkMessage;

export const kakaotalkCarousel = {
  head: kakaoTalkCarouselHead,
  list: [
    kakaotalkCarouselListItem1,
  ],
  tail: kakaotalkCarouselTail,
} satisfies KakaoTalkCarousel;


