import { ChannelIdentity } from '../../channel-identity';
import { ContactMessage } from '../../contact-message';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ProcessingMode } from '../../enums';

/**
 * This callback provides a notification to the API clients that the corresponding app message was submitted to a channel. This notification is created before any confirmation from Delivery Receipts.
 */
export interface MessageSubmitEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'MESSAGE_SUBMIT';
  /** @see MessageSubmitNotification */
  message_submit_notification?: MessageSubmitNotification;
}

export interface MessageSubmitNotification {
  /** The ID of the app message. */
  message_id?: string;
  /** The ID of the conversation the app message is part of. Will be empty if processing_mode is DISPATCH. */
  conversation_id?: string;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the contact. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see ContactMessage */
  submitted_message?: ContactMessage;
  /** Metadata specified in the message_metadata field of a Send Message request, if any. */
  metadata?: string;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}
