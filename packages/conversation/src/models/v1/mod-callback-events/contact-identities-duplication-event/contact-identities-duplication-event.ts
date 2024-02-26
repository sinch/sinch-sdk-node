import { ConversationChannel } from '../../conversation-channel';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when duplicates of channel identities are found between multiple contacts in the contact database during message and event processing.
 */
export interface ContactIdentitiesDuplicationEvent extends ConversationCallbackEvent {

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
  /** @see DuplicatedIdentitiesEvent */
  duplicated_contact_identities_notification: DuplicatedIdentitiesEvent;
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_IDENTITIES_DUPLICATION';
}

export interface DuplicatedIdentitiesEvent {
  /** List of DuplicatedIdentities */
  duplicated_identities?: DuplicatedIdentities[];
}
export interface DuplicatedIdentities {
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** List of duplicated ids in the specified channel. */
  contact_ids?: string[];
}
