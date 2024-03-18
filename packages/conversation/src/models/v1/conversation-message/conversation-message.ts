import { AppMessage } from '../app-message';
import { ChannelIdentity } from '../channel-identity';
import { ContactMessage } from '../contact-message';
import { ConversationDirection, ProcessingMode } from '../enums';

/**
 * A message on a particular channel.
 */
export type ConversationMessage = ConversationAppMessage | ConversationContactMessage;

interface ConversationMessageBase {
  /** Output only. The time Conversation API processed the message. */
  accept_time?: Date;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. */
  contact_id?: string;
  /** The ID of the conversation. */
  conversation_id?: string;
  /** @see ConversationDirection */
  direction?: ConversationDirection;
  /** The ID of the message. */
  id?: string;
  /** Optional. Metadata associated with the contact. Up to 1024 characters long. */
  metadata?: string;
  /** Output only. Flag for whether this message was injected. */
  injected?: boolean;
  /** For Contact Messages the sender ID is the contact sent the message to. For App Messages the sender that was used to send the message, if applicable. */
  sender_id?: string;
  /** Output only. The processing mode. */
  processing_mode?: ProcessingMode;
  /** The status of the message, eventTime of the status and reason if status is failed */
  message_status?: MessageStatus | null;
}

interface MessageStatus {
  /** Status of the message */
  status: Status;
  /** Timestamp at which the current status occurred */
  event_time: Date;
  /** If status is FAILED, reason of failure */
  reason?: string
}

type Status =
  'STATUS_UNSPECIFIED'
  | 'QUEUED'
  | 'QUEUED_ON_CHANNEL'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED'
  | 'SWITCHING_CHANNEL'
  | 'RECEIVED';

interface ConversationAppMessage extends ConversationMessageBase {
  /** @see AppMessage */
  app_message: AppMessage;
  // Exclude other message types
  contact_message?: never;
}

interface ConversationContactMessage extends ConversationMessageBase {
  /** @see ContactMessage */
  contact_message: ContactMessage;
  // Exclude other message types
  app_message?: never;
}
