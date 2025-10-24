import { KakaoTalkCarouselCommerceMessageContent } from '../../../src/models';
import { kakaotalkCarousel } from './kakaotalk-carousel';

export const kakaotalkCarouselCommerceMessageContent = {
  push_alarm: false,
  adult: false,
  carousel: kakaotalkCarousel,
} satisfies KakaoTalkCarouselCommerceMessageContent;
