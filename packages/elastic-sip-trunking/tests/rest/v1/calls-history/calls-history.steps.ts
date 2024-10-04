import { ElasticSipTrunking, ElasticSipTrunkingService, CallsHistoryApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let callsHistoryApi: CallsHistoryApi;
let listResponse: PageResult<ElasticSipTrunking.Call>;
let callsHistoryList: ElasticSipTrunking.Call[];
let pagesIteration: number;

Given('the Elastic SIP Trunking service "Calls History" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  callsHistoryApi = elasticSipTrunkingService.calls;
});

When('I send a request to find the a page from the Calls History with no filtering parameters', async () => {
  listResponse = await callsHistoryApi.find({});
});

Then('the response contains {string} Calls from history', (expectedAnswer: string) => {
  const expectedCallsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedCallsCount);
});

Then('a Call History object from the page result contains the Call History details', () => {
  const call = listResponse.data[0];
  assert.equal(call.callId, 'N00DL3C4T5');
  assert.equal(call.to, '12017777777');
  assert.equal(call.from, 'sip:12015555555@76.184.202.212');
  const direction: ElasticSipTrunking.DirectionEnum = 'outbound';
  assert.equal(call.direction, direction);
  assert.deepEqual(call.answerTime, new Date('2024-06-06T16:57:52Z'));
  assert.deepEqual(call.endTime, new Date('2024-06-06T16:57:55Z'));
  assert.equal(call.durationSeconds, 4);
  assert.equal(call.billingDurationSeconds, 60);
  const callResult: ElasticSipTrunking.CallResult = 'COMPLETED';
  assert.equal(call.callResult, callResult);
  const price: ElasticSipTrunking.Money = {
    amount: 0.004,
    currencyCode: 'USD',
  };
  assert.deepEqual(call.pricePerMinute, price);
  assert.deepEqual(call.price, price);
  assert.deepEqual(call.createTime, new Date('2024-06-06T16:57:45+0000'));
  assert.equal(call.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.equal(call.trunkId, '01W4FFL35P4NC4K35SIPTRUNK2');
});

When('I send a request to list all the Calls from the Calls History', async () => {
  callsHistoryList = [];
  for await (const call of callsHistoryApi.find({})) {
    callsHistoryList.push(call);
  }
});

When('I iterate manually over the Calls History pages', async () => {
  callsHistoryList = [];
  listResponse = await callsHistoryApi.find({});
  callsHistoryList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      callsHistoryList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Calls History list contains {string} Calls',  (expectedAnswer: string) => {
  const expectedSipEndpointsCount = parseInt(expectedAnswer, 10);
  assert.equal(callsHistoryList.length, expectedSipEndpointsCount);
});

Then('the Calls History iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to find the a page from the Calls History with a createTime range filter', async () => {
  listResponse = await callsHistoryApi.find({
    createTimeRange: {
      from: '2024-06-06T16:00:00',
    },
  });
});
