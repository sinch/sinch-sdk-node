export type KakaoTalkButton =
  KakaoTalkWebLinkButton
  | KakaoTalkAppLinkButton
  | KakaoTalkBotKeywordButton;

export interface KakaoTalkWebLinkButton {
  /** Button type */
  type: 'WL';
  /** Text displayed on the button */
  name: string;
  /** URL opened on a mobile device */
  link_mo: string;
  /** URL opened on a desktop device */
  link_pc?: string;
}

export interface KakaoTalkAppLinkButton {
  /** Button type */
  type: 'AL';
  /** Text displayed on the button */
  name: string;
  /** App link opened on an iOS device (e.g. tel://PHONE_NUMBER) */
  scheme_ios: string;
  /** App link opened on an Android device (e.g. tel://PHONE_NUMBER) */
  scheme_android: string;
}

export interface KakaoTalkBotKeywordButton {
  /** Button type */
  type: 'BK';
  /** Text displayed on the button */
  name: string;
}
