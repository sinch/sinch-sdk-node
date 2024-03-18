import { ContactNotification } from '../contact-notification';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a new contact is deleted.
 */
export interface ContactDeleteEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_DELETE';
  /** @see ContactNotification */
  contact_delete_notification?: ContactNotification;
}
