import { ConversationChannel } from '../conversation-channel';
import { KakaoTalkCredentials } from '../kakao-talk-credentials';
import { LineCredentials } from '../line-credentials';
import { MMSCredentials } from '../mms-credentials';
import { StaticBearerCredential } from '../static-bearer-credential';
import { StaticTokenCredential } from '../static-token-credential';
import { TelegramCredentials } from '../telegram-credentials';
import { WeChatCredentials } from '../wechat-credentials';

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
  /** @see KakaoTalkCredentials */
  kakaotalk_credentials?: KakaoTalkCredentials;
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

  /** TBC: Not documented */
  state?: AppState;
  /** TBC: Not documented */
  channel_known_id?: string
}

export interface AppState {
  /** TBC: Not documented - should be an enum 'PENDING' | 'FAILING' | 'ACTIVE' */
  status?: string
  /** TBC: Not documented */
  description?: string;
}
