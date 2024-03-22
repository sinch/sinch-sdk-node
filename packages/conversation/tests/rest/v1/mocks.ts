import { ChannelRecipientIdentity } from '../../../src';

const channelIdentities: ChannelRecipientIdentity[] = [
  {
    channel: 'SMS',
    identity: 'phoneNumber',
  },
  {
    channel: 'MESSENGER',
    identity: 'messengerId',
  },
];

export const recipientContactId = {
  recipient: {
    contact_id: 'contact_id',
  },
};

export const recipientChannelIdentities = {
  recipient: {
    identified_by: {
      channel_identities: channelIdentities,
    },
  },
};
