import { Contact } from '../../contact';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when two contacts are merged.
 */
export interface ContactMergeEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_MERGE';
  /** @see ContactMergeNotification */
  contact_merge_notification?: ContactMergeNotification;
}

export interface ContactMergeNotification {
  /** @see Contact */
  preserved_contact?: Contact;
  /** @see Contact */
  deleted_contact?: Contact;
}
