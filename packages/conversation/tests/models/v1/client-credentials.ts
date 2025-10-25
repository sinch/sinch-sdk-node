import { ClientCredentials } from '../../../src/models';

export const clientCredentials = {
  client_id: 'client_id',
  client_secret: 'client_secret',
  endpoint: 'endpoint',
  scope: 'scope',
  response_type: 'response_type',
  token_request_type: 'BASIC',
} satisfies ClientCredentials;
