import { ConversationChannel } from '../conversation-channel';

export interface ChannelRecipientIdentity {

  /** @see ConversationChannel */
  channel: ConversationChannel;
  /** The channel recipient identity. */
  identity: string;
}
