/**
 * If you are including the KakaoTalkChat channel in the `channel_identifier` property, you must include this object.
 */
export interface KakaoTalkChatCredentials {

  /** KakaoTalk Plus friend ID. */
  kakaotalk_plus_friend_id: string;
  /** InfoBank API KEY. */
  api_key?: string
}
