import { AppMessage } from '../app-message';
import { ChannelIdentity } from '../channel-identity';
import { ContactMessage } from '../contact-message';
import { ConversationDirection } from '../conversation-direction';

/**
 * A message on a particular channel.
 */
export interface ConversationMessageInjected {

  /** The processed time of the message in UTC timezone. Must be less than current_time and greater than (current_time - 30 days) */
  accept_time?: Date;
  /** @see AppMessage */
  app_message?: AppMessage;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact registered in the conversation provided. */
  contact_id?: string;
  /** @see ContactMessage */
  contact_message?: ContactMessage;
  /** @see ConversationDirection */
  direction?: ConversationDirection;
  /** Optional. Metadata associated with the contact. Up to 1024 characters long. */
  metadata?: string;
}
