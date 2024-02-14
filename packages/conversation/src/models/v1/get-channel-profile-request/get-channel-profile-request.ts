import { Recipient } from '../recipient';
import { GetChannelProfileConversationChannel } from '../enums';

export interface GetChannelProfileRequest {

  /** The ID of the app. */
  app_id: string;
  /** @see Recipient */
  recipient: Recipient;
  /** @see GetChannelProfileConversationChannel */
  channel: GetChannelProfileConversationChannel;
}
