import { ApplicationsApi, VoiceService, Voice  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let applicationsApi: ApplicationsApi;
let listNumbersResponse: Voice.ListNumbersResponse;
let assignNumbersResponse: void;
let unassignNumberResponse: void;
let queryNumberResponse: Voice.QueryNumberResponse;
let callbackURLs: Voice.GetCallbacks;
let updateCallbackURLsResponse: void;

Given('the Voice service "Applications" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    voiceApplicationManagementHostname: 'http://localhost:3020',
  });
  applicationsApi = voiceService.applications;
});

When('I send a request to get information about my owned numbers', async () => {
  listNumbersResponse = await applicationsApi.listNumbers({});
});

Then('the response contains details about the numbers that I own', () => {
  assert.ok(listNumbersResponse.numbers);
  assert.equal(listNumbersResponse.numbers.length, 4);
  const number1 = listNumbersResponse.numbers[0];
  assert.equal(number1.number, '+12012222222');
  assert.equal(number1.applicationkey, undefined);
  assert.equal(number1.capability, 'voice');
  const number2 = listNumbersResponse.numbers[1];
  assert.equal(number2.number, '+12013333333');
  assert.equal(number2.applicationkey, 'ba5eba11-1dea-1337-babe-5a1ad00d1eaf');
  assert.equal(number2.capability, 'voice');
});

When('I send a request to assign some numbers to a Voice Application', async () => {
  assignNumbersResponse = await applicationsApi.assignNumbers({
    assignNumbersRequestBody: {
      numbers: [
        '+12012222222',
      ],
      applicationkey: 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3',
      capability: 'voice',
    },
  });
});

Then('the assign numbers response contains no data', () => {
  assert.deepEqual(assignNumbersResponse, {});
});

When('I send a request to unassign a number from a Voice Application', async () => {
  unassignNumberResponse = await applicationsApi.unassignNumber({
    unassignNumbersRequestBody: {
      number: '+12012222222',
    },
  });
});

Then('the unassign number response contains no data', () => {
  assert.deepEqual(unassignNumberResponse, {});
});

When('I send a request to get information about a specific number', async () => {
  queryNumberResponse = await applicationsApi.queryNumber({
    number: '+12015555555',
  });
});

Then('the response contains details about the specific number', () => {
  assert.ok(queryNumberResponse.number);
  const number = queryNumberResponse.number;
  assert.equal(number.countryId, 'US');
  assert.equal(number.numberType, 'Fixed');
  assert.equal(number.normalizedNumber, '+12015555555');
  assert.equal(number.restricted, true);
  const rate: Voice.VoicePrice = {
    currencyId: 'USD',
    amount: 0.0100,
  };
  assert.deepEqual(number.rate, rate);
});

When('I send a request to get the callback URLs associated to an application', async () => {
  callbackURLs = await applicationsApi.getCallbackURLs({
    applicationkey: 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3',
  });
});

Then('the response contains callback URLs details', () => {
  assert.ok(callbackURLs.url);
  assert.equal(callbackURLs.url.primary, 'https://my.callback-server.com/voice');
  assert.equal(callbackURLs.url.fallback, 'https://my.fallback-server.com/voice');
});

When('I send a request to update the callback URLs associated to an application', async () => {
  updateCallbackURLsResponse = await applicationsApi.updateCallbackURLs({
    applicationkey: 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3',
    updateCallbacksRequestBody: {
      url: {
        primary: 'https://my-new.callback-server.com/voice',
      },
    },
  });
});

Then('the update callback URLs response contains no data', () => {
  assert.deepEqual(updateCallbackURLsResponse, {});
});
