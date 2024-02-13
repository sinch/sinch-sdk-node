import { ConversationChannel } from '../conversation-channel';
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
export type ConversationChannelCredential =
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

export interface ChannelCredentialsWhatsApp extends ConversationChannelCredentialBase {
  channel: 'WHATSAPP';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsRcs extends ConversationChannelCredentialBase {
  channel: 'RCS';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export type ChannelCredentialsSms = ChannelCredentialsSmsWithBearer | ChannelCredentialsSmsWithAppId;

export interface ChannelCredentialsSmsWithBearer extends ConversationChannelCredentialBase {
  channel: 'SMS';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsSmsWithAppId extends ConversationChannelCredentialBase {
  channel: 'SMS';
  /** @see SMSCredentials */
  sms_credentials: SMSCredentials;
}

export interface ChannelCredentialsMessenger extends ConversationChannelCredentialBase {
  channel: 'MESSENGER';
  /** @see StaticTokenCredential */
  static_token: StaticTokenCredential;
}

export interface ChannelCredentialsViber extends ConversationChannelCredentialBase {
  channel: 'VIBER';
  /** @see StaticTokenCredential */
  static_token: StaticTokenCredential;
}

export interface ChannelCredentialsViberBM extends ConversationChannelCredentialBase {
  channel: 'VIBERBM';
  /** @see StaticBearerCredential */
  static_bearer: StaticBearerCredential;
}

export interface ChannelCredentialsMms extends ConversationChannelCredentialBase {
  channel: 'MMS';
  /** @see MMSCredentials */
  mms_credentials: MMSCredentials;
}

export interface ChannelCredentialsInstagram extends ConversationChannelCredentialBase {
  channel: 'INSTAGRAM';
  /** @see InstagramCredentials */
  instagram_credentials: InstagramCredentials;
}

export interface ChannelCredentialsTelegram extends ConversationChannelCredentialBase {
  channel: 'TELEGRAM';
  /** @see TelegramCredentials */
  telegram_credentials: TelegramCredentials;
}

export interface ChannelCredentialsKakaoTalk extends ConversationChannelCredentialBase {
  channel: 'KAKAOTALK';
  /** @see KakaoTalkCredentials */
  kakaotalk_credentials: KakaoTalkCredentials;
}

export interface ChannelCredentialsKakaoTalkChat extends ConversationChannelCredentialBase {
  channel: 'KAKAOTALKCHAT';
  /** @see KakaoTalkCredentials */
  kakaotalkchat_credentials: KakaoTalkChatCredentials;
}

export interface ChannelCredentialsLine extends ConversationChannelCredentialBase {
  channel: 'LINE';
  /** @see LineCredentials */
  line_credentials: LineCredentials;
}

export interface ChannelCredentialsWeChat extends ConversationChannelCredentialBase {
  channel: 'WECHAT';
  /** @see WeChatCredentials */
  wechat_credentials: WeChatCredentials;
}

export interface ChannelCredentialsAppleBC extends ConversationChannelCredentialBase {
  channel: 'APPLEBC';
  /** @see AppleBcCredentials */
  applebc_credentials: AppleBcCredentials;
}

interface ConversationChannelCredentialBase {
  /** @see ConversationChannel */
  channel: ConversationChannel;
  /** The secret used to verify the channel callbacks for channels which support callback verification. The callback verification is not needed for Sinch-managed channels because the callbacks are not leaving Sinch internal networks. Max length is 256 characters. Note: leaving channel_callback_secret empty for channels with callback verification will disable the verification. */
  callback_secret?: string;
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
