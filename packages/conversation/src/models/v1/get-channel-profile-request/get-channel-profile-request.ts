import { Recipient } from '../recipient';
import { GetChannelProfileConversationChannel } from '../enums';

export interface GetChannelProfileRequest<T extends Recipient> {

  /** The ID of the app. */
  app_id: string;
  /** @see Recipient */
  recipient: T;
  /** @see GetChannelProfileConversationChannel */
  channel: GetChannelProfileConversationChannel;
}
