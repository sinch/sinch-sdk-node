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
  /** For Contact Messages (MO messages), the sender ID represents the recipient to which the message was sent. This may be a phone number (in the case of SMS and MMS) or a unique ID (in the case of WhatsApp). This is field is not supported on all channels, nor is it supported for MT messages. */
  sender_id?: string;
  /** Output only. The processing mode. */
  processing_mode?: ProcessingMode;
  /** @deprecated The status of the message, eventTime of the status and reason if status is failed */
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
