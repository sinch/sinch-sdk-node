import { ConversationChannel } from '../conversation-channel';
import { KakaoTalkCredentials } from '../kakaotalk-credentials';
import { KakaoTalkChatCredentials } from '../kakaotalkchat-credentials';
import { LineCredentials } from '../line-credentials';
import { MMSCredentials } from '../mms-credentials';
import { SMSCredentials } from '../sms-credentials';
import { StaticBearerCredential } from '../static-bearer-credential';
import { StaticTokenCredential } from '../static-token-credential';
import { TelegramCredentials } from '../telegram-credentials';
import { WeChatCredentials } from '../wechat-credentials';
import { InstagramCredentials } from '../instagram-credentials';
import { AppleBcCredentials } from '../applebc-credentials';

/**
 * Enables access to the underlying messaging channel.
 */
export interface ConversationChannelCredential {

  /** The secret used to verify the channel callbacks for channels which support callback verification. The callback verification is not needed for Sinch-managed channels because the callbacks are not leaving Sinch internal networks. Max length is 256 characters. Note: leaving channel_callback_secret empty for channels with callback verification will disable the verification. */
  callback_secret?: string;
  /** @see ConversationChannel */
  channel: ConversationChannel;
  /** @see MMSCredentials */
  mms_credentials?: MMSCredentials;
  /** @see SMSCredentials */
  sms_credentials?: SMSCredentials;
  /** @see KakaoTalkCredentials */
  kakaotalk_credentials?: KakaoTalkCredentials;
  /** @see KakaoTalkCredentials */
  kakaotalkchat_credentials?: KakaoTalkChatCredentials;
  /** @see StaticBearerCredential */
  static_bearer?: StaticBearerCredential;
  /** @see StaticTokenCredential */
  static_token?: StaticTokenCredential;
  /** @see TelegramCredentials */
  telegram_credentials?: TelegramCredentials;
  /** @see LineCredentials */
  line_credentials?: LineCredentials;
  /** @see WeChatCredentials */
  wechat_credentials?: WeChatCredentials;
  /** @see InstagramCredentials */
  instagram_credentials?: InstagramCredentials;
  /** @see AppleBcCredentials */
  applebc_credentials?: AppleBcCredentials;
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
