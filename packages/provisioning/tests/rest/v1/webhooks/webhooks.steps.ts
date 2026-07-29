import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';
import { Provisioning, ProvisioningService } from '../../../../src';
import { WebhooksApi } from '../../../../src/rest/v1/webhooks';

const PROJECT_ID = 'tinyfrog-jump-high-over-lilypadbasin';

let webhooksApi: WebhooksApi;
let listResponse: PageResult<Provisioning.Webhook>;
let webhooksList: Provisioning.Webhook[];
let pagesIteration: number;
let webhook: Provisioning.Webhook;
let deleteWebhookResponse: void;

Given('the Provisioning service "Webhooks" is available', function () {
  const provisioningService = new ProvisioningService({
    projectId: PROJECT_ID,
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    provisioningHostname: 'http://localhost:3025',
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
  assert.equal(webhook.projectId, PROJECT_ID);
  assert.deepEqual(webhook.triggers, ['ALL']);
  assert.equal(webhook.target, 'https://my-callback-server.com/provisioning-new');
});

When('I send a request to list provisioning webhooks', async () => {
  listResponse = await webhooksApi.list({
    pageSize: 1,
  });
});

Then('the response contains the list of provisioning webhooks', () => {
  assert.equal(listResponse.data.length, 1);
  const firstWebhook = listResponse.data[0];
  assert.equal(firstWebhook.id, '01PROVWEBHOOK001');
  assert.equal(firstWebhook.projectId, PROJECT_ID);
  assert.deepEqual(firstWebhook.triggers, ['ALL']);
});

When('I send a request to list all the provisioning webhooks', async () => {
  webhooksList = [];
  for await (const item of webhooksApi.list({ pageSize: 1 })) {
    webhooksList.push(item);
  }
});

When('I iterate manually over the provisioning webhooks pages', async () => {
  webhooksList = [];
  listResponse = await webhooksApi.list({
    pageSize: 1,
  });
  webhooksList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      webhooksList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the provisioning webhooks list contains {string} webhooks', (expectedAnswer: string) => {
  const expectedWebhooksCount = parseInt(expectedAnswer, 10);
  assert.equal(webhooksList.length, expectedWebhooksCount);
});

Then('the provisioning webhooks iteration result contains the data from {string} pages', (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a provisioning webhook', async () => {
  webhook = await webhooksApi.get({
    webhookId: '01PROVWEBHOOK001',
  });
});

Then('the response contains the provisioning webhook details', () => {
  assert.equal(webhook.id, '01PROVWEBHOOK001');
  assert.equal(webhook.projectId, PROJECT_ID);
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
  assert.equal(webhook.projectId, PROJECT_ID);
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
  assert.equal(webhook.projectId, PROJECT_ID);
  assert.deepEqual(webhook.triggers, ['WHATSAPP_SENDER_ACTIVE']);
});

When('I send a request to delete a provisioning webhook', async () => {
  deleteWebhookResponse = await webhooksApi.delete({
    webhookId: '01PROVWEBHOOK001',
  });
});

Then('the delete provisioning webhook response contains no data', () => {
  assert.deepEqual(deleteWebhookResponse, {});
});
