import { ChannelIdentity } from '../channel-identity';
import { AppEvent } from '../app-event';
import { ContactEvent } from '../contact-event';
import { ProcessingMode } from '../enums';

/**
 * Inject Event request
 */
export type InjectConversationEventRequest = InjectConversationAppEvent | InjectConversationContactEvent; // TODO: add contact_message_event DEVEXP-345

interface InjectConversationEventBase {
  /** Optional. The ID of the event\'s conversation. Will not be present for apps in Dispatch Mode. */
  conversation_id?: string;
  /** Optional. The ID of the contact. Will not be present for apps in Dispatch Mode. */
  contact_id?: string;
  /** @see ChannelIdentity */
  channel_identity?: ChannelIdentity;
  /** The processed time of the message in UTC timezone. Must be less than current_time and greater than (current_time - 30 days). */
  accept_time: Date;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode?: ProcessingMode;
}

interface InjectConversationAppEvent extends InjectConversationEventBase {
  /** @see AppEvent */
  app_event: AppEvent;
  // Exclude other event types
  contact_event?: never;
}

interface InjectConversationContactEvent extends InjectConversationEventBase {
  /** @see AppEvent */
  contact_event: ContactEvent;
  // Exclude other event types
  app_event?: never;
}
