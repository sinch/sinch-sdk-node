import { GetChannelProfileConversationChannel } from '../get-channel-profile-conversation-channel';
import { Recipient } from '../recipient';

export interface GetChannelProfileRequest {

  /** The ID of the app. */
  app_id: string;
  /** @see Recipient */
  recipient: Recipient;
  /** @see GetChannelProfileConversationChannel */
  channel: GetChannelProfileConversationChannel;
}
