import { ContactNotification } from '../contact-notification';

/**
 * This callback is sent when a new contact is updated.
 */
export interface ContactUpdateEvent {

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
  /** @see ContactNotification */
  contact_update_notification?: ContactNotification;

  trigger: 'CONTACT_UPDATE';
}
