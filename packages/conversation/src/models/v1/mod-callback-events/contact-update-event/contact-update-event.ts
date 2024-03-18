import { ContactNotification } from '../contact-notification';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when a new contact is updated.
 */
export interface ContactUpdateEvent extends ConversationCallbackEvent{
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_UPDATE';
  /** @see ContactNotification */
  contact_update_notification?: ContactNotification;
}
