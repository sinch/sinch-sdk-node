import { AppMessage } from '../app-message';
import { ChannelIdentity } from '../channel-identity';
import { ContactMessage } from '../contact-message';
import { ConversationDirection } from '../conversation-direction';
import { ProcessingMode } from '../processing-mode';

/**
 * A message on a particular channel.
 */
export interface ConversationMessage {

  /** The time Conversation API processed the message. */
  accept_time?: Date;
  /** @see AppMessage */
  app_message?: AppMessage;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. */
  contact_id?: string;
  /** @see ContactMessage */
  contact_message?: ContactMessage;
  /** The ID of the conversation. */
  conversation_id?: string;
  /** @see ConversationDirection */
  direction?: ConversationDirection;
  /** The ID of the message. */
  id?: string;
  /** Optional. Metadata associated with the contact. Up to 1024 characters long. */
  metadata?: string;
  /** Flag for whether this message was injected. */
  injected?: boolean;

  /** TBC: Not documented */
  sender_id?: string;
  /** TBC: Not documented */
  processing_mode?: ProcessingMode;
  /** TBC: Not documented */
  message_status?: any | null;
}
