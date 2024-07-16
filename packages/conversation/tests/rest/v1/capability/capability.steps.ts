import { Conversation, ConversationService, SupportedConversationRegion, CapabilityApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let capabilityApi: CapabilityApi;
let lookupCapabilityResponse: Conversation.LookupCapabilityResponse;

Given('the Conversation service "Capability" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  capabilityApi = conversationService.capability;
});

When('I send a request to query a capability lookup', async () => {
  lookupCapabilityResponse = await capabilityApi.lookup({
    lookupCapabilityRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      recipient: {
        contact_id: '01W4FFL35P4NC4K35CONTACT001',
      },
    },
  });
});

Then('the response contains the id of the capability lookup query', () => {
  assert.equal(lookupCapabilityResponse.app_id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(lookupCapabilityResponse.recipient?.contact_id, '01W4FFL35P4NC4K35CONTACT001');
  assert.equal(lookupCapabilityResponse.request_id, '01W4FFL35P4NC4K35CAPABILITY');
});
