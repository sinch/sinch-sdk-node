import { AppMessage } from '../app-message';
import { ChannelIdentity } from '../channel-identity';
import { ContactMessage } from '../contact-message';
import { ConversationDirection, ProcessingMode } from '../enums';

/**
 * A message on a particular channel.
 */
export type InjectMessageRequest = InjectAppMessageRequest | InjectContactMessageRequest;

interface InjectMessageRequestBase {

  /** The processed time of the message in UTC timezone. Must be less than current_time and greater than (current_time - 30 days) */
  accept_time?: Date;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact registered in the conversation provided. */
  contact_id?: string;
  /** @see ConversationDirection */
  direction?: ConversationDirection;
  /** The ID of the conversation. */
  conversation_id?: string;
  /** Flag for whether this message was injected. */
  injected?: boolean;
  /** For Contact Messages the sender ID is the contact sent the message to. For App Messages the sender that was used to send the message, if applicable. */
  sender_id?: string;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode?: ProcessingMode;
  /** Optional. Metadata associated with the contact. Up to 1024 characters long. */
  metadata?: string;
}

interface InjectAppMessageRequest extends InjectMessageRequestBase {
  /** @see AppMessage */
  app_message?: AppMessage;
}

interface InjectContactMessageRequest extends InjectMessageRequestBase {
  /** @see ContactMessage */
  contact_message?: ContactMessage;
}
