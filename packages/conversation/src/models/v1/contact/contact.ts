import { ChannelIdentity } from '../channel-identity';
import { ConversationChannel } from '../conversation-channel';
import { ContactLanguage } from '../contact-language';

/**
 * A participant in a conversation typically representing a person. It is associated with a collection of channel identities.
 */
export interface Contact {

  /** List of channel identities. */
  channel_identities?: ChannelIdentity[];
  /** List of channels defining the channel priority. */
  channel_priority?: ConversationChannel[];
  /** The display name. A default 'Unknown' will be assigned if left empty. */
  display_name?: string;
  /** Email of the contact. */
  email?: string;
  /** Contact identifier in an external system. */
  external_id?: string;
  /** The ID of the contact. */
  id?: string;
  /** */
  language?: ContactLanguage;
  /** Metadata associated with the contact. Up to 1024 characters long. */
  metadata?: string;
}
