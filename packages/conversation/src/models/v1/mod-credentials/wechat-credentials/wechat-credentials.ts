/**
 * If you are including the WeChat channel in the `channel_identifier` property, you must include this object.
 */
export interface WeChatCredentials {

  /** The AppID(Developer ID) for the WeChat channel to which you are connecting. */
  app_id: string;
  /** The AppSecret(Developer Password) for the WeChat channel to which you are connecting. */
  app_secret: string;
  /** The Token for the WeChat channel to which you are connecting. */
  token: string;
  /** The Encoding AES Key for the WeChat channel to which you are connecting. */
  aes_key: string;
}
