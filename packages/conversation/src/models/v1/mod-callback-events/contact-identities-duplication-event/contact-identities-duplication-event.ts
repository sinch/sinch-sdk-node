import { ConversationChannel } from '../../conversation-channel';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is sent when duplicates of channel identities are found between multiple contacts in the contact database during message and event processing.
 */
export interface ContactIdentitiesDuplicationEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CONTACT_IDENTITIES_DUPLICATION';
  /** @see DuplicatedIdentitiesEvent */
  duplicated_contact_identities_notification: DuplicatedIdentitiesEvent;
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
