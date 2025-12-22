import { KakaoTalkMessage } from '../kakaotalk-message';

export interface KakaoTalkCommerce extends KakaoTalkMessage{
  /** Set to `true` if a push alarm should be sent to a device. */
  push_alarm?: boolean;
  /** Set to `true` if a message contains adult content. Set to `false` by default. */
  adult?: boolean;
}
