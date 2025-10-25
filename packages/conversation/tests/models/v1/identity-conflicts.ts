import { IdentityConflict } from '../../../src/models';

export const identityConflict = {
  identity: 'identity',
  channels: ['channel1', 'channel2'],
  contact_ids: ['contact1', 'contact2'],
} satisfies IdentityConflict;
