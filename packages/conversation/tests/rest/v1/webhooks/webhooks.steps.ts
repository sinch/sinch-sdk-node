import { Conversation, ConversationService, WebhooksApi, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let webhooksApi: WebhooksApi;
let webhooksList: Conversation.ListWebhooksResponse;
let webhook: Conversation.Webhook;
let deleteWebhookResponse: void;

Given('the Conversation service "Webhooks" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  webhooksApi = conversationService.webhooks;
});

When('I send a request to create a conversation webhook', async () => {
  webhook = await webhooksApi.create({
    webhookCreateRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      target: 'https://my-callback-server.com/capability',
      triggers: [ 'CAPABILITY' ],
      secret: 'CactusKnight_SurfsWaves',
      target_type: 'HTTP',
    },
  });
});

Then('the conversation webhook is created', () => {
  assert.equal(webhook.id, '01W4FFL35P4NC4K35WEBHOOK004');
  assert.deepEqual(webhook.triggers, ['CAPABILITY']);
  assert.equal(webhook.secret, 'CactusKnight_SurfsWaves');
});

When('I send a request to list the conversation webhooks for an app', async () => {
  webhooksList = await webhooksApi.list({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
  });
});

Then('the response contains the list of conversation webhooks', () => {
  assert.equal(webhooksList.webhooks?.length, 4);
  const webhook = webhooksList.webhooks![1];
  const triggersList: Conversation.WebhookTrigger[] = [
    'CONTACT_CREATE',
    'CONTACT_DELETE',
    'CONTACT_IDENTITIES_DUPLICATION',
    'CONTACT_MERGE',
    'CONTACT_UPDATE',
  ];
  assert.deepEqual(webhook.triggers, triggersList);
  assert.equal(webhook.id, '01W4FFL35P4NC4K35WEBHOOK002');
  assert.equal(webhook.target_type, 'HTTP');
  assert.equal(webhook.secret, 'DiscoDragon_BuildsLego');
  assert.equal(webhook.client_credentials, null);
});

When('I send a request to retrieve a conversation webhook', async () => {
  webhook = await webhooksApi.get({
    webhook_id: '01W4FFL35P4NC4K35WEBHOOK001',
  });
});

Then('the response contains the conversation webhook details', () => {
  assert.equal(webhook.id, '01W4FFL35P4NC4K35WEBHOOK001');
  assert.equal(webhook.app_id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(webhook.target, 'https://my-callback-server.com/unsupported');
  assert.equal(webhook.target_type, 'HTTP');
  assert.equal(webhook.secret, 'VeganVampire_SipsTea');
  const triggersList: Conversation.WebhookTrigger[] = ['UNSUPPORTED'];
  assert.deepEqual(webhook.triggers, triggersList);
  const credentials: Conversation.ClientCredentials = {
    endpoint: 'https://my-auth-server.com/oauth2/token',
    client_id: 'webhook-username',
    client_secret: 'webhook-password',
  };
  assert.deepEqual(webhook.client_credentials, credentials);
});

When('I send a request to update a conversation webhook', async () => {
  webhook = await webhooksApi.update({
    webhook_id: '01W4FFL35P4NC4K35WEBHOOK004',
    webhookUpdateRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP002',
      target: 'https://my-callback-server.com/capability-optin-optout',
      triggers: [
        'CAPABILITY',
        'OPT_IN',
        'OPT_OUT',
      ],
      secret: 'SpacePanda_RidesUnicycle',
    },
  });
});

Then('the response contains the conversation webhook details with updated data', () => {
  assert.equal(webhook.id, '01W4FFL35P4NC4K35WEBHOOK004');
  assert.equal(webhook.app_id, '01W4FFL35P4NC4K35CONVAPP002');
  assert.equal(webhook.target, 'https://my-callback-server.com/capability-optin-optout');
  assert.deepEqual(webhook.triggers, ['CAPABILITY', 'OPT_IN', 'OPT_OUT']);
  assert.equal(webhook.target_type, 'HTTP');
  assert.equal(webhook.secret, 'SpacePanda_RidesUnicycle');
  assert.equal(webhook.client_credentials, null);
});

When('I send a request to delete a conversation webhook', async () => {
  deleteWebhookResponse = await webhooksApi.delete({
    webhook_id: '01W4FFL35P4NC4K35WEBHOOK004',
  });
});

Then('the delete conversation webhook response contains no data', () => {
  assert.deepEqual(deleteWebhookResponse, {} );
});
