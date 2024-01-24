import { ConversationChannel } from '../conversation-channel';

/**
 * A unique identity of message recipient on a particular channel. For example, the channel identity on SMS, WHATSAPP or VIBERBM is a MSISDN phone number.
 */
export interface ChannelIdentity {

  /** Required if using a channel that uses app-scoped channel identities. Currently, FB Messenger, Viber Bot, Instagram, Apple Messages for Business, LINE, and WeChat use app-scoped channel identities, which means contacts will have different channel identities on different Conversation API apps. These can be thought of as virtual identities that are app-specific and, therefore, the app_id must be included in the API call. */
  app_id?: string;
  /** @see ConversationChannel */
  channel: ConversationChannel;
  /** The channel identity. This will differ from channel to channel. For example, a phone number for SMS, WhatsApp, and Viber Business. */
  identity: string;
}
