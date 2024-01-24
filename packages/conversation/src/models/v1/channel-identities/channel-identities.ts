import { ChannelRecipientIdentity } from '../channel-recipient-identity';

export interface ChannelIdentities {

  /** A list of specific channel identities. The API will use these identities when sending to specific channels. */
  channel_identities: ChannelRecipientIdentity[];
}
