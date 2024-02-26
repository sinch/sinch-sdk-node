import { ConversationChannel } from '../../conversation-channel';
import { ChannelIdentity } from '../../channel-identity';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ProcessingMode } from '../../enums';

/**
 * Some of the callbacks received from the underlying channels might be specific to a single channel or may not have a proper mapping in Conversation API yet.
 */
export interface UnsupportedCallbackEvent extends ConversationCallbackEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback's documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see UnsupportedCallback */
  unsupported_callback?: UnsupportedCallback;
  /** Name of the trigger responsible for this event. */
  trigger: 'UNSUPPORTED';
}

export interface UnsupportedCallback {

  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** Normally a JSON payload as sent by the channel. */
  payload?: string;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
  /** The message ID. */
  id?: string;
  /** The ID of the contact. This field is blank if not supported. */
  contact_id?: string;
  /** The ID of the conversation this message is part of. This field is blank if not supported. */
  conversation_id?: string;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
}
