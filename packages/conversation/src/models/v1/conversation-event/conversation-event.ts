import { ChannelIdentity } from '../channel-identity';
import { ConversationDirection, ProcessingMode } from '../enums';
import { AppEvent } from '../app-event';
import { ContactEvent } from '../contact-event';
import { ContactMessageEvent } from '../contact-message-event';

/**
 * An event on a particular channel.
 */
export type ConversationEvent =
  ConversationAppEvent
  | ConversationContactEvent
  | ConversationContactMessageEvent;

interface ConversationEventBase {
  /** @see ConversationDirection */
  direction?: ConversationDirection;
  /** The ID of the event. */
  id: string;
  /** Optional. The ID of the event's conversation. Will not be present for apps in Dispatch Mode. */
  conversation_id?: string;
  /** Optional. The ID of the contact. Will not be present for apps in Dispatch Mode. */
  contact_id?: string;
  /** @see ChannelIdentity */
  channel_identity: ChannelIdentity;
  /**  */
  accept_time?: Date;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode: ProcessingMode;
}

interface ConversationAppEvent extends ConversationEventBase {
  app_event: AppEvent;
}

interface ConversationContactEvent extends ConversationEventBase {
  contact_event: ContactEvent;
}

interface ConversationContactMessageEvent extends ConversationEventBase {
  contact_message_event: ContactMessageEvent;
}
