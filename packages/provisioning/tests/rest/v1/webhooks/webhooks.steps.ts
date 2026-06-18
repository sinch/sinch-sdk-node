import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { Provisioning, ProvisioningService } from '../../../../src';
import { WebhooksApi } from '../../../../src/rest/v1/webhooks';

let webhooksApi: WebhooksApi;
let webhooksList: Provisioning.ListWebhooksResponse;
let webhook: Provisioning.Webhook;
let deleteWebhookResponse: void;

Given('the Provisioning service "Webhooks" is available', function () {
  const provisioningService = new ProvisioningService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    provisioningHostname: 'http://localhost:3024',
  });
  webhooksApi = provisioningService.webhooks;
});

When('I send a request to create a provisioning webhook', async () => {
  webhook = await webhooksApi.create({
    webhookCreateRequestBody: {
      target: 'https://my-callback-server.com/provisioning-new',
      secret: 'ProvisioningSecret_Create',
      triggers: ['ALL'],
    },
  });
});

Then('the provisioning webhook is created', () => {
  assert.equal(webhook.id, '01PROVWEBHOOK003');
  assert.deepEqual(webhook.triggers, ['ALL']);
  assert.equal(webhook.target, 'https://my-callback-server.com/provisioning-new');
});

When('I send a request to list provisioning webhooks', async () => {
  webhooksList = await webhooksApi.list({
    pageSize: 15,
  });
});

Then('the response contains the list of provisioning webhooks', () => {
  assert.equal(webhooksList.totalSize, 2);
  assert.equal(webhooksList.pageSize, 15);
  assert.equal(webhooksList.webhooks?.length, 2);
  const firstWebhook = webhooksList.webhooks![0];
  assert.equal(firstWebhook.id, '01PROVWEBHOOK001');
  assert.deepEqual(firstWebhook.triggers, ['ALL']);
});

When('I send a request to retrieve a provisioning webhook', async () => {
  webhook = await webhooksApi.get({
    webhookId: '01PROVWEBHOOK001',
  });
});

Then('the response contains the provisioning webhook details', () => {
  assert.equal(webhook.id, '01PROVWEBHOOK001');
  assert.equal(webhook.target, 'https://my-callback-server.com/provisioning-all');
  assert.deepEqual(webhook.triggers, ['ALL']);
});

When('I send a request to replace a provisioning webhook', async () => {
  webhook = await webhooksApi.replace({
    webhookId: '01PROVWEBHOOK002',
    webhookReplaceRequestBody: {
      target: 'https://my-callback-server.com/provisioning-replaced',
      secret: 'ProvisioningSecret_Replace',
      triggers: ['BUNDLE_DONE'],
    },
  });
});

Then('the response contains the replaced provisioning webhook details', () => {
  assert.equal(webhook.id, '01PROVWEBHOOK002');
  assert.equal(webhook.target, 'https://my-callback-server.com/provisioning-replaced');
  assert.deepEqual(webhook.triggers, ['BUNDLE_DONE']);
});

When('I send a request to update a provisioning webhook', async () => {
  webhook = await webhooksApi.update({
    webhookId: '01PROVWEBHOOK002',
    webhookUpdateRequestBody: {
      triggers: ['WHATSAPP_SENDER_ACTIVE'],
    },
  });
});

Then('the response contains the updated provisioning webhook details', () => {
  assert.equal(webhook.id, '01PROVWEBHOOK002');
  assert.deepEqual(webhook.triggers, ['WHATSAPP_SENDER_ACTIVE']);
});

When('I send a request to delete a provisioning webhook', async () => {
  deleteWebhookResponse = await webhooksApi.delete({
    webhookId: '01PROVWEBHOOK001',
  });
});

Then('the delete provisioning webhook response contains no data', () => {
  assert.equal(deleteWebhookResponse, undefined);
});
