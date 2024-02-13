import { Contact } from '../../contact';
import { ConversationEvent } from '../conversation-event';

/**
 * This callback is sent when two contacts are merged.
 */
export interface ContactMergeEvent extends ConversationEvent {

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
  /** @see ContactMergeEventContactMergeNotification */
  contact_merge_notification?: ContactMergeNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_MERGE';
}

export interface ContactMergeNotification {

  /** @see Contact */
  preserved_contact?: Contact;
  /** @see Contact */
  deleted_contact?: Contact;
}
