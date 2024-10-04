import { BatchesApi, SmsService, Sms } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';
import { ParameterGroup } from '../../../../src/models';

let batchesApi: BatchesApi;
let sendSmsResponse: Sms.TextResponse;
let dryRunResponse: Sms.DryRunResponse;
let listResponse: PageResult<Sms.SendSMSResponse>;
let batchesList: Sms.SendSMSResponse[];
let pagesIteration: number;
let batch: Sms.SendSMSResponse;
let deliveryFeedbackResponse: void;

Given('the SMS service "Batches" is available', () => {
  const smsService = new SmsService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    smsHostname: 'http://localhost:3017',
  });
  batchesApi = smsService.batches;
});

When('I send a request to send a text message', async () => {
  const sendSmsRequest: Sms.SendTextSMSRequestData = {
    sendSMSRequestBody: {
      body: 'SMS body message',
      to: ['+12017777777'],
      from: '+12015555555',
      send_at: new Date('2024-06-06T09:25:00Z'),
      delivery_report: 'full',
      feedback_enabled: true,
    },
  };
  sendSmsResponse = await batchesApi.sendTextMessage(sendSmsRequest);
});

Then('the response contains the text SMS details', () => {
  assert.equal(sendSmsResponse.id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.deepEqual(sendSmsResponse.to, ['12017777777']);
  assert.equal(sendSmsResponse.from, '12015555555');
  assert.equal(sendSmsResponse.canceled, false);
  assert.equal(sendSmsResponse.body, 'SMS body message');
  assert.equal(sendSmsResponse.type, 'mt_text');
  assert.deepEqual(sendSmsResponse.created_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.deepEqual(sendSmsResponse.modified_at, new Date('2024-06-06T09:22:14.304Z'));
  const fullDeliveryReport: Sms.DeliveryReportEnum = 'full';
  assert.equal(sendSmsResponse.delivery_report, fullDeliveryReport);
  assert.deepEqual(sendSmsResponse.send_at, new Date('2024-06-06T09:25:00Z'));
  assert.deepEqual(sendSmsResponse.expire_at, new Date('2024-06-09T09:25:00Z'));
  assert.equal(sendSmsResponse.feedback_enabled, true);
  assert.equal(sendSmsResponse.flash_message, false);
});

When('I send a request to send a text message with multiple parameters', async () => {
  const sendSmsRequest: Sms.SendTextSMSRequestData = {
    sendSMSRequestBody: {
      body: 'Hello ${name}! Get 20% off with this discount code ${code}',
      to: ['+12017777777', '+12018888888'],
      from: '+12015555555',
      parameters: {
        name: {
          '+12017777777': 'John',
          '+12018888888': 'Paul',
          default: 'there',
        },
        code: {
          '+12017777777': 'HALLOWEEN20 🎃',
        },
      },
      delivery_report: 'full',
    },
  };
  sendSmsResponse = await batchesApi.sendTextMessage(sendSmsRequest);
});

Then('the response contains the text SMS details with multiple parameters', () => {
  assert.equal(sendSmsResponse.id, '01W4FFL35P4NC4K35SMSBATCH2');
  assert.deepEqual(sendSmsResponse.to, ['12017777777', '12018888888']);
  assert.equal(sendSmsResponse.from, '12015555555');
  assert.equal(sendSmsResponse.canceled, false);
  const parameters: ParameterGroup = {
    name: {
      default: 'there',
      '+12017777777': 'John',
      '+12018888888': 'Paul',
    },
    code: {
      '+12017777777': 'HALLOWEEN20 🎃',
    },
  };
  assert.deepEqual(sendSmsResponse.parameters, parameters);
  assert.equal(sendSmsResponse.body, 'Hello ${name}! Get 20% off with this discount code ${code}');
  assert.equal(sendSmsResponse.type, 'mt_text');
  assert.deepEqual(sendSmsResponse.created_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.deepEqual(sendSmsResponse.modified_at, new Date('2024-06-06T09:22:14.304Z'));
  const fullDeliveryReport: Sms.DeliveryReportEnum = 'full';
  assert.equal(sendSmsResponse.delivery_report, fullDeliveryReport);
  assert.deepEqual(sendSmsResponse.expire_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.equal(sendSmsResponse.flash_message, false);
});

When('I send a request to perform a dry run of a batch', async () => {
  const sendSmsRequest: Sms.DryRunRequestData = {
    dryRunRequestBody: {
      from: '+12015555555',
      to: [
        '+12017777777',
        '+12018888888',
        '+12019999999',
      ],
      parameters: {
        name: {
          '+12017777777': 'John',
          default: 'there',
        },
      },
      body: 'Hello ${name}!',
      delivery_report: 'none',
      type: 'mt_text',
    },
  };
  dryRunResponse = await batchesApi.dryRun(sendSmsRequest);
});

Then('the response contains the calculated bodies and number of parts for all messages in the batch', () => {
  assert.equal(dryRunResponse.number_of_messages, 3);
  assert.equal(dryRunResponse.number_of_recipients, 3);
  assert.ok(dryRunResponse.per_recipient);
  assert.equal(dryRunResponse.per_recipient.length, 3);
  const johnMessage = dryRunResponse.per_recipient.filter(
    (perRecipient) => perRecipient.recipient === '12017777777',
  ).pop();
  assert.ok(johnMessage);
  assert.equal(johnMessage.body, 'Hello John!');
  assert.equal(johnMessage.number_of_parts, 1);
  assert.equal(johnMessage.encoding, 'text');
  const defaultMessage = dryRunResponse.per_recipient.filter(
    (perRecipient) => perRecipient.recipient === '12018888888',
  ).pop();
  assert.ok(defaultMessage);
  assert.equal(defaultMessage.body, 'Hello there!');
  assert.equal(defaultMessage.number_of_parts, 1);
  assert.equal(defaultMessage.encoding, 'text');
});

When('I send a request to list the SMS batches', async () => {
  const listBatchRequest: Sms.ListBatchesRequestData = {
    page_size: 2,
  };
  listResponse = await batchesApi.list(listBatchRequest);
});

Then('the response contains {string} SMS batches', (expectedAnswer: string) => {
  const expectedBatchesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedBatchesCount);
});

When('I send a request to list all the SMS batches', async () => {
  batchesList = [];
  for await (const batch of batchesApi.list({ page_size: 2 })) {
    batchesList.push(batch);
  }
});

When('I iterate manually over the SMS batches pages', async () => {
  batchesList = [];
  listResponse = await batchesApi.list({
    page_size: 2,
  });
  batchesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      batchesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SMS batches list contains {string} SMS batches',  (expectedAnswer: string) => {
  const expectedBatchesCount = parseInt(expectedAnswer, 10);
  assert.equal(batchesList.length, expectedBatchesCount);
});

Then('the SMS batches iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve an SMS batch', async () => {
  batch = await batchesApi.get({
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
  });
});

Then('the response contains the SMS batch details', () => {
  assert.equal(batch.id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.deepEqual(batch.to, ['12017777777']);
  assert.equal(batch.from, '12015555555');
  assert.equal(batch.canceled, false);
  assert.equal(batch.body, 'SMS body message');
  assert.equal(batch.type, 'mt_text');
  assert.deepEqual(batch.created_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.deepEqual(batch.modified_at, new Date('2024-06-06T09:22:14.304Z'));
  const fullDeliveryReport: Sms.DeliveryReportEnum = 'full';
  assert.equal(batch.delivery_report, fullDeliveryReport);
  assert.deepEqual(batch.send_at, new Date('2024-06-06T09:25:00Z'));
  assert.deepEqual(batch.expire_at, new Date('2024-06-09T09:25:00Z'));
  assert.equal(batch.feedback_enabled, true);
  assert.equal((batch as Sms.TextResponse).flash_message, false);
});

When('I send a request to update an SMS batch', async () => {
  batch = await batchesApi.update({
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    updateBatchMessageRequestBody: {
      from: '+12016666666',
      to_add: [
        '01W4FFL35P4NC4K35SMSGROUP1',
      ],
      delivery_report: 'summary',
    },
  });
});

Then('the response contains the SMS batch details with updated data', () => {
  assert.equal(batch.id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.deepEqual(batch.to, ['12017777777', '01W4FFL35P4NC4K35SMSGROUP1']);
  assert.equal(batch.from, '12016666666');
  assert.equal(batch.canceled, false);
  assert.equal(batch.body, 'SMS body message');
  assert.equal(batch.type, 'mt_text');
  assert.deepEqual(batch.created_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.deepEqual(batch.modified_at, new Date('2024-06-06T09:22:48.054Z'));
  const summaryDeliveryReport: Sms.DeliveryReportEnum = 'summary';
  assert.equal(batch.delivery_report, summaryDeliveryReport);
  assert.deepEqual(batch.send_at, new Date('2024-06-06T09:25:00Z'));
  assert.deepEqual(batch.expire_at, new Date('2024-06-09T09:25:00Z'));
  assert.equal(batch.feedback_enabled, true);
  assert.equal((batch as Sms.TextResponse).flash_message, false);
});

When('I send a request to replace an SMS batch', async () => {
  batch = await batchesApi.replace({
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    replaceBatchMessageRequestBody: {
      from: '+12016666666',
      to: [
        '+12018888888',
      ],
      body: 'This is the replacement batch',
      send_at: new Date('2024-06-06T09:35:00Z'),
    },
  });
});

Then('the response contains the new SMS batch details with the provided data for replacement', () => {
  assert.equal(batch.id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.deepEqual(batch.to, ['12018888888']);
  assert.equal(batch.from, '12016666666');
  assert.equal(batch.canceled, false);
  assert.equal(batch.body, 'This is the replacement batch');
  assert.equal(batch.type, 'mt_text');
  assert.deepEqual(batch.created_at, new Date('2024-06-06T09:22:14.304Z'));
  assert.deepEqual(batch.modified_at, new Date('2024-06-06T09:23:32.504Z'));
  const noDeliveryReport: Sms.DeliveryReportEnum = 'none';
  assert.equal(batch.delivery_report, noDeliveryReport);
  assert.deepEqual(batch.send_at, new Date('2024-06-06T09:35:00Z'));
  assert.deepEqual(batch.expire_at, new Date('2024-06-09T09:35:00Z'));
  assert.equal(batch.feedback_enabled, undefined);
  assert.equal((batch as Sms.TextResponse).flash_message, false);
});

When('I send a request to cancel an SMS batch', async () => {
  batch = await batchesApi.cancel({
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
  });
});

Then('the response contains the SMS batch details with a cancelled status', () => {
  assert.equal(batch.id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.equal(batch.canceled, true);
});

When('I send a request to send delivery feedbacks', async () => {
  deliveryFeedbackResponse = await batchesApi.sendDeliveryFeedback({
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    deliveryFeedbackRequestBody: {
      recipients: [
        '+12017777777',
      ],
    },
  });
});

Then('the delivery feedback response contains no data', () => {
  assert.deepEqual(deliveryFeedbackResponse, {});
});
