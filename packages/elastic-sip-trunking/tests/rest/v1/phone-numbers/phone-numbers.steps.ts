import { ElasticSipTrunking, ElasticSipTrunkingService, PhoneNumbersApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let phoneNumbersApi: PhoneNumbersApi;
let phoneNumber: ElasticSipTrunking.PhoneNumber;
let phoneNumbersResponse: PageResult<ElasticSipTrunking.PhoneNumber>;
let phoneNumbersList: ElasticSipTrunking.PhoneNumber[];
let pagesIteration: number;

Given('the Elastic SIP Trunking service "Phone Numbers" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  phoneNumbersApi = elasticSipTrunkingService.phoneNumbers;
});

When('I send a request to list the existing Phone Numbers', async () => {
  phoneNumbersResponse = await phoneNumbersApi.list({});
});

Then('the response contains {string} Phone Numbers', (expected: string) => {
  assert.equal(phoneNumbersResponse.data.length, parseInt(expected, 10));
});

When('I send a request to list all the Phone Numbers', async () => {
  phoneNumbersList = [];
  for await (const entry of phoneNumbersApi.list({})) {
    phoneNumbersList.push(entry);
  }
});

Then('the Phone Numbers list contains {string} Phone Numbers', (expected: string) => {
  assert.equal(phoneNumbersList.length, parseInt(expected, 10));
});

When('I iterate manually over the Phone Numbers pages', async () => {
  phoneNumbersList = [];
  phoneNumbersResponse = await phoneNumbersApi.list({});
  phoneNumbersList.push(...phoneNumbersResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (phoneNumbersResponse.hasNextPage) {
      phoneNumbersResponse = await phoneNumbersResponse.nextPage();
      phoneNumbersList.push(...phoneNumbersResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Phone Numbers iteration result contains the data from {string} pages', (expected: string) => {
  assert.equal(pagesIteration, parseInt(expected, 10));
});

When('I send a request to retrieve an EST phone number', async () => {
  phoneNumber = await phoneNumbersApi.get({
    phoneNumber: '+15552229999',
  });
});

Then('the response contains the EST phone number details', () => {
  assert.equal(phoneNumber.id, '01ARZ3NDEKTSV4RRFFQ69G5FAV');
  assert.equal(phoneNumber.sipTrunkId, '5RTRZ3NDEKTSV4RRFFQ69G5EWS');
  assert.equal(phoneNumber.phoneNumber, '+15552229999');
  assert.equal(phoneNumber.countryCode, 'US');
  assert.deepEqual(phoneNumber.createTime, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(phoneNumber.updateTime, new Date('2024-06-06T14:42:42Z'));
});
