import { ChannelIdentity } from '../../channel-identity';
import { ContactMessage } from '../../contact-message';
import { ProcessingMode } from '../../enums';

export interface MessageInboundEventItem {

  /** The message ID. */
  id?: string;
  /** The direction of the message, it's always TO_APP for contact messages. */
  direction?: 'TO_APP';
  /** @see ContactMessage */
  contact_message?: ContactMessage;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The ID of the conversation this message is part of. Will be empty if processing_mode is DISPATCH. */
  conversation_id?: string;
  /** The ID of the contact. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** Usually, metadata specific to the underlying channel is provided in this field. Refer to the individual channels' documentation for more information (for example, SMS delivery receipts). Note that, for Choice message responses, this field is populated with the value of the message_metadata field of the corresponding Send message request. */
  metadata?: string;
  /** Timestamp marking when the channel callback was received by the Conversation API. */
  accept_time?: Date;
  /** The sender ID to which the contact sent the message, if applicable. For example, originator msisdn/short code for SMS and MMS. */
  sender_id?: string;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode?: ProcessingMode;
  /** Flag for whether this message was injected. */
  injected?: boolean;
}
