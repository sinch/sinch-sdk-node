import { ConversationChannel } from '../conversation-channel';
import { Recipient } from '../recipient';
import { AppMessageMessage } from '../app-message-message';
import { ConversationMetadataUpdateStrategy, MessageQueue, ProcessingStrategy } from '../enums';

/**
 * This is the request body for sending a message. `app_id`, `recipient`, and `message` are all required fields.
 */
export interface SendMessageRequest {

  /** The ID of the app sending the message. */
  app_id: string;
  /** Overwrites the default callback url for delivery receipts for this message The REST URL should be of the form: `http://host[:port]/path` */
  callback_url?: string;
  /** Explicitly define the channels and order in which they are tried when sending the message. All channels provided in this field must be configured in the corresponding Conversation API app, or the request will be rejected. Which channels the API will try and their priority is defined by: 1. `channel_priority_order` if available. 2. `recipient.identified_by.channel_identities` if available. 3. When recipient is a `contact_id`:     - if a conversation with the contact exists: the active channel of the conversation is tried first.     - the existing channels for the contact are ordered by contact channel preferences if given.     - lastly the existing channels for the contact are ordered by the app priority. */
  channel_priority_order?: ConversationChannel[];
  /** Channel-specific properties. The key in the map must point to a valid channel property key as defined by the enum ChannelPropertyKeys. The maximum allowed property value length is 1024 characters. */
  channel_properties?: { [K in ChannelPropertyKey]?: string; };
  /** @see AppMessage */
  message: AppMessageMessage;
  /** Metadata that should be associated with the message. Returned in the `metadata` field of a [Message Delivery Receipt](https://developers.sinch.com/docs/conversation/callbacks/#message-delivery-receipt). Up to 1024 characters long. */
  message_metadata?: string;
  /** Metadata that should be associated with the conversation. This metadata will be propagated on MO callbacks associated with this conversation. Up to 1024 characters long. Note that the MO callback will always use the last metadata available in the conversation. Important notes:   - If you send a message with the `conversation_metadata` field populated, and then send another message without populating the `conversation_metadata` field, the original metadata will continue be propagated on the related MO callbacks.  - If you send a message with the `conversation_metadata` field populated, and then send another message with a different value for `conversation_metadata` in the same conversation, the latest metadata value overwrites the existing one. So, future MO callbacks will include the new metadata.  - The `conversation_metadata` only accepts json objects.  Currently only returned in the `message_metadata` field of an [Inbound Message](/docs/conversation/callbacks/#inbound-message) callback. */
  conversation_metadata?: object;
  /** @see MessageQueue */
  queue?: MessageQueue;
  /** @see Recipient */
  recipient: Recipient;
  /** The timeout allotted for sending the message, expressed in seconds. Passed to channels which support it and emulated by the Conversation API for channels without ttl support but with message retract/unsend functionality. Channel failover will not be performed for messages with an expired TTL. The format is an integer with the suffix `s` (for seconds). Valid integer range is 3 to 315,576,000,000 (inclusive). Example values include `10s` (10 seconds) and `86400s` (24 hours). */
  ttl?: string;
  /** Overrides the app\'s [Processing Mode](../../../../../conversation/processing-modes/). Default value is `DEFAULT`. */
  processing_strategy?: ProcessingStrategy;
  /** An arbitrary identifier that will be propagated to callbacks related to this message, including MO replies. Only applicable to messages sent with the `CONVERSATION` processing mode. Up to 128 characters long. */
  correlation_id?: string;
  /** Update strategy for the `conversation_metadata` field. */
  conversation_metadata_update_strategy?: ConversationMetadataUpdateStrategy;
}

export type ChannelPropertyKey =
  'MESSENGER_MESSAGING_TYPE'
  | 'MESSENGER_MESSAGE_TAG'
  | 'MESSENGER_NOTIFICATION_TYPE'
  | 'VIBER_SENDER_NAME'
  | 'VIBER_SENDER_AVATAR'
  | 'SMS_FLASH_MESSAGE'
  | 'MMS_SENDER'
  | 'TELEGRAM_DISABLE_LINK_PREVIEW'
  | 'SMS_SENDER'
  | 'INSTAGRAM_MESSAGE_TAG'
  | 'MMS_STRICT_VALIDATION'
  | 'KAKAOTALK_AUTHENTICATION'
  | 'LINE_VIDEO_TRACKING_ID';

