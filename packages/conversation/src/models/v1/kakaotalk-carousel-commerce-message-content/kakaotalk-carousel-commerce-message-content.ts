import { KakaoTalkCarousel } from '../kakaotalk-carousel';

/**
 * Carousel content
 */
export interface KakaoTalkCarouselCommerceMessageContent {
  /** Set to `true` if a push alarm should be sent to a device. */
  push_alarm?: boolean;
  /** Set to `true` if a message contains adult content. Set to `false` by default. */
  adult?: boolean;
  /** @see KakaoTalkCarousel */
  carousel: KakaoTalkCarousel;
}


