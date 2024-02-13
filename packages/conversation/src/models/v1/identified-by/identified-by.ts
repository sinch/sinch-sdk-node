import { ChannelRecipientIdentity } from '../channel-recipient-identity';

/** Identifies the recipient of the message. Requires either contact_id or identified_by. If Dispatch Mode is used, only identified_by is allowed. */
export interface IdentifiedBy {

  /** The identity as specified by the channel. */
  identified_by: IdentifiedByItem;
}
export interface IdentifiedByItem {

  /** A list of specific channel identities. The API will use these identities when sending to specific channels. */
  channel_identities: ChannelRecipientIdentity[];
}
