import { KakaoTalkMessage } from '../kakaotalk-message';

/**
 * Carousel content
 */
export interface KakaoTalkCarousel {
  /** Carousel introduction */
  head?: KakaoTalkCarouselHead;
  /** List of carousel cards */
  list: KakaoTalkMessage[];
  /** "More" button */
  tail?: KakaoTalkCarouselTail;
}

export interface KakaoTalkCarouselHead {
  /** Carousel introduction title */
  header: string;
  /** Carousel introduction description */
  content: string;
  /** URL to the image displayed in the introduction */
  image_url: string;
  /** URL opened on a mobile device */
  link_mo?: string;
  /** URL opened on a desktop device */
  link_pc?: string;
  /** App link opened on an iOS device (e.g. `tel://PHONE_NUMBER`) */
  scheme_ios?: string;
  /** App link opened on an Android device (e.g. `tel://PHONE_NUMBER`) */
  scheme_android?: string;
}

export interface KakaoTalkCarouselTail {
  /** URL opened on a mobile device */
  link_mo: string;
  /** URL opened on a desktop device */
  link_pc?: string;
  /** App link opened on an iOS device (e.g. `tel://PHONE_NUMBER`) */
  scheme_ios?: string;
  /** App link opened on an Android device (e.g. `tel://PHONE_NUMBER`) */
  scheme_android?: string;
}
