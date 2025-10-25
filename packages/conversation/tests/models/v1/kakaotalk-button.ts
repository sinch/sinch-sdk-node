import { KakaoTalkAppLinkButton, KakaoTalkBotKeywordButton, KakaoTalkWebLinkButton } from '../../../src/models';

export const kakaotalkWebLinkButton = {
  type: 'WL',
  name: 'Buy Now',
  link_mo: 'https://example.com/buy',
  link_pc: 'https://example.com/buy',
} satisfies KakaoTalkWebLinkButton;

export const kakaotalkAppLinkButton = {
  type: 'AL',
  name: 'Open App',
  scheme_ios: 'exampleapp://open',
  scheme_android: 'exampleapp://open',
} satisfies KakaoTalkAppLinkButton;

export const kakaoTalkBotKeywordButton = {
  type: 'BK',
  name: 'Help',
} satisfies KakaoTalkBotKeywordButton;
