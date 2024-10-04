import { InboundsApi, SmsService, Sms } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let inboundsApi: InboundsApi;
let inboundMessage: Sms.InboundMessageResponse;
let listResponse: PageResult<Sms.InboundMessageResponse>;
let inboundMessagesList: Sms.InboundMessageResponse[];
let pagesIteration: number;

Given('the SMS service "Inbounds" is available', () => {
  const smsService = new SmsService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    smsHostname: 'http://localhost:3017',
  });
  inboundsApi = smsService.inbounds;
});

When('I send a request to retrieve an inbound message', async () => {
  inboundMessage = await inboundsApi.get({
    inbound_id: '01W4FFL35P4NC4K35INBOUND01',
  });
});

Then('the response contains the inbound message details', () => {
  assert.equal(inboundMessage.id, '01W4FFL35P4NC4K35INBOUND01');
  assert.equal(inboundMessage.from, '12015555555');
  assert.equal(inboundMessage.to, '12017777777');
  assert.equal(inboundMessage.body, 'Hello John!');
  assert.equal(inboundMessage.type, 'mo_text');
  assert.equal(inboundMessage.operator_id, '311071');
  assert.deepEqual(inboundMessage.received_at, new Date('2024-06-06T14:16:54.777Z'));
});

When('I send a request to list the inbound messages', async () => {
  const listInboundMessagesRequest: Sms.ListInboundMessagesRequestData = {
    page_size: 2,
    to: [
      '+12017777777',
      '+12018888888',
    ],
  };
  listResponse = await inboundsApi.list(listInboundMessagesRequest);
});

Then('the response contains {string} inbound messages', (expectedAnswer: string) => {
  const expectedInboundMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedInboundMessagesCount);
});

When('I send a request to list all the inbound messages', async () => {
  inboundMessagesList = [];
  const listInboundMessagesRequest: Sms.ListInboundMessagesRequestData = {
    page_size: 2,
    to: [
      '+12017777777',
      '+12018888888',
    ],
  };
  for await (const inboundMessage of inboundsApi.list(listInboundMessagesRequest)) {
    inboundMessagesList.push(inboundMessage);
  }
});

When('I iterate manually over the inbound messages pages', async () => {
  inboundMessagesList = [];
  listResponse = await inboundsApi.list({
    page_size: 2,
    to: [
      '+12017777777',
      '+12018888888',
    ],
  });
  inboundMessagesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      inboundMessagesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the inbound messages list contains {string} inbound messages',  (expectedAnswer: string) => {
  const expectedInboundMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(inboundMessagesList.length, expectedInboundMessagesCount);
});

Then('the inbound messages iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});
