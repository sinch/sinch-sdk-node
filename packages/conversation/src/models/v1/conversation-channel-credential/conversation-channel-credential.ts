import {
  AppleBcCredentials,
  InstagramCredentials,
  KakaoTalkChatCredentials,
  KakaoTalkCredentials,
  LineCredentials,
  MMSCredentials,
  SMSCredentials,
  StaticBearerCredential,
  StaticTokenCredential,
  TelegramCredentials,
  WeChatCredentials,
} from '../mod-credentials';

/**
 * Enables access to the underlying messaging channel.
 */
export type ConversationChannelCredentialRequest =
  ChannelCredentialsAppleBC
  | ChannelCredentialsInstagram
  | ChannelCredentialsKakaoTalk
  | ChannelCredentialsKakaoTalkChat
  | ChannelCredentialsLine
  | ChannelCredentialsMessenger
  | ChannelCredentialsMms
  | ChannelCredentialsRcs
  | ChannelCredentialsSms
  | ChannelCredentialsTelegram
  | ChannelCredentialsViber
  | ChannelCredentialsViberBM
  | ChannelCredentialsWeChat
  | ChannelCredentialsWhatsApp;

/**
 * Enables access to the underlying messaging channel.
 */
export type ConversationChannelCredential =
  ChannelCredentialsAppleBCResponse
  | ChannelCredentialsInstagramResponse
  | ChannelCredentialsKakaoTalkResponse
  | ChannelCredentialsKakaoTalkChatResponse
  | ChannelCredentialsLineResponse
  | ChannelCredentialsMessengerResponse
  | ChannelCredentialsMmsResponse
  | ChannelCredentialsRcsResponse
  | ChannelCredentialsSmsResponse
  | ChannelCredentialsTelegramResponse
  | ChannelCredentialsViberResponse
  | ChannelCredentialsViberBMResponse
  | ChannelCredentialsWeChatResponse
  | ChannelCredentialsWhatsAppResponse;

export interface ChannelCredentialsWhatsApp extends ConversationChannelCredentialRequestBase {
  channel: 'WHATSAPP';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsWhatsAppResponse
  extends ChannelCredentialsWhatsApp, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsRcs extends ConversationChannelCredentialRequestBase {
  channel: 'RCS';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsRcsResponse
  extends ChannelCredentialsRcs, ConversationChannelCredentialResponseBase {}

export type ChannelCredentialsSms = ChannelCredentialsSmsWithBearer | ChannelCredentialsSmsWithAppId;

export type ChannelCredentialsSmsResponse
  = ChannelCredentialsSmsWithBearerResponse | ChannelCredentialsSmsWithAppIdResponse;

export interface ChannelCredentialsSmsWithBearer extends ConversationChannelCredentialRequestBase {
  channel: 'SMS';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsSmsWithBearerResponse
  extends ChannelCredentialsSmsWithBearer, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsSmsWithAppId extends ConversationChannelCredentialRequestBase {
  channel: 'SMS';
  /** @see SMSCredentials */
  sms_credentials: SMSCredentials;
}

export interface ChannelCredentialsSmsWithAppIdResponse
  extends ChannelCredentialsSmsWithAppId, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsMessenger extends ConversationChannelCredentialRequestBase {
  channel: 'MESSENGER';
  /** @see StaticTokenCredential */
  static_token: StaticTokenCredential;
}

export interface ChannelCredentialsMessengerResponse
  extends ChannelCredentialsMessenger, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsViber extends ConversationChannelCredentialRequestBase {
  channel: 'VIBER';
  /** @see StaticTokenCredential */
  static_token: StaticTokenCredential;
}

export interface ChannelCredentialsViberResponse
  extends ChannelCredentialsViber, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsViberBM extends ConversationChannelCredentialRequestBase {
  channel: 'VIBERBM';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsViberBMResponse
  extends ChannelCredentialsViberBM, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsMms extends ConversationChannelCredentialRequestBase {
  channel: 'MMS';
  /** @see MMSCredentials */
  mms_credentials: MMSCredentials;
}

export interface ChannelCredentialsMmsResponse
  extends ChannelCredentialsMms, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsInstagram extends ConversationChannelCredentialRequestBase {
  channel: 'INSTAGRAM';
  /** @see InstagramCredentials */
  instagram_credentials: InstagramCredentials;
}

export interface ChannelCredentialsInstagramResponse
  extends ChannelCredentialsInstagram, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsTelegram extends ConversationChannelCredentialRequestBase {
  channel: 'TELEGRAM';
  /** @see TelegramCredentials */
  telegram_credentials: TelegramCredentials;
}

export interface ChannelCredentialsTelegramResponse
  extends ChannelCredentialsTelegram, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsKakaoTalk extends ConversationChannelCredentialRequestBase {
  channel: 'KAKAOTALK';
  /** @see KakaoTalkCredentials */
  kakaotalk_credentials: KakaoTalkCredentials;
}

export interface ChannelCredentialsKakaoTalkResponse
  extends ChannelCredentialsKakaoTalk, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsKakaoTalkChat extends ConversationChannelCredentialRequestBase {
  channel: 'KAKAOTALKCHAT';
  /** @see KakaoTalkCredentials */
  kakaotalkchat_credentials: KakaoTalkChatCredentials;
}

export interface ChannelCredentialsKakaoTalkChatResponse
  extends ChannelCredentialsKakaoTalkChat, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsLine extends ConversationChannelCredentialRequestBase {
  channel: 'LINE';
  /** @see LineCredentials */
  line_credentials: LineCredentials;
}

export interface ChannelCredentialsLineResponse
  extends ChannelCredentialsLine, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsWeChat extends ConversationChannelCredentialRequestBase {
  channel: 'WECHAT';
  /** @see WeChatCredentials */
  wechat_credentials: WeChatCredentials;
}

export interface ChannelCredentialsWeChatResponse
  extends ChannelCredentialsWeChat, ConversationChannelCredentialResponseBase {}

export interface ChannelCredentialsAppleBC extends ConversationChannelCredentialRequestBase {
  channel: 'APPLEBC';
  /** @see AppleBcCredentials */
  applebc_credentials: AppleBcCredentials;
}

export interface ChannelCredentialsAppleBCResponse
  extends ChannelCredentialsAppleBC, ConversationChannelCredentialResponseBase {}

interface ConversationChannelCredentialRequestBase {
  /** The secret used to verify the channel callbacks for channels which support callback verification. The callback verification is not needed for Sinch-managed channels because the callbacks are not leaving Sinch internal networks. Max length is 256 characters. Note: leaving channel_callback_secret empty for channels with callback verification will disable the verification. */
  callback_secret?: string;
}

interface ConversationChannelCredentialResponseBase {
  /**
   * Output only. The state of the channel credentials integration.
   * When a channel is activated, the user is prompted for credentials that must be validated and in some cases exchanged by a long-lived token (Instagram).
   */
  state?: ChannelIntegrationState;
  /** Output only. Additional identifier set by the channel that represents a specific id used by the channel. */
  channel_known_id?: string
}

export interface ChannelIntegrationState {
  /**
   * Pending - initial status when the channel has been activated in the front-end.
   * Active - credentials have been successfully validated and exchanged for a long-lived token. This status is used by default for channels in which the credential can't be validated.
   * Failed - failed to validate credentials and acquire a long-lived token.
   */
  status: 'PENDING' | 'ACTIVE' | 'FAILING';
  /** Description in case the integration fails. */
  description?: string;
}
