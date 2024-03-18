import { ContactNotification } from '../contact-notification';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a new contact is created.
 */
export interface ContactCreateEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_CREATE';
  /** @see ContactNotification */
  contact_create_notification?: ContactNotification;
}
