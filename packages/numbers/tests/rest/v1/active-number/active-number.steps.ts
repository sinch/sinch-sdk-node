import { Given, Then, When } from '@cucumber/cucumber';
import { ActiveNumberApi, NumbersService, Numbers } from '../../../../src';
import { PageResult } from '@sinch/sdk-client';
import assert from 'assert';

let activeNumberApi: ActiveNumberApi;
let listActiveNumbersResponse: PageResult<Numbers.ActiveNumber>;
const activeNumbersList: Numbers.ActiveNumber[] = [];
let activeNumber: Numbers.ActiveNumber;
let error: any;

Given('the Numbers service "Active Number" is available', function () {
  const numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
  activeNumberApi = numbersService.activeNumber;
});

When('I send a request to list the active phone numbers', async () => {
  listActiveNumbersResponse = await activeNumberApi.list({
    regionCode: 'US',
    type: 'LOCAL',
  });
});

Then('the response contains {string} active phone numbers', (expectedAnswer: string) => {
  const expectedPhoneNumbersCount = parseInt(expectedAnswer, 10);
  assert.equal(listActiveNumbersResponse.data.length, expectedPhoneNumbersCount);
});

When('I send a request to list all the active phone numbers', async () => {
  const requestData: Numbers.ListActiveNumbersRequestData = {
    regionCode: 'US',
    type: 'LOCAL',
  };
  for await (const number of activeNumberApi.list(requestData)) {
    activeNumbersList.push(number);
  }
});

Then('the phone numbers list contains {string} active phone numbers', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(activeNumbersList.length, expectedNumbers);
  const phoneNumber1 = activeNumbersList[0];
  assert.equal(phoneNumber1.voiceConfiguration?.type, 'FAX');
  assert.ok(phoneNumber1.voiceConfiguration?.serviceId !== '');
  const phoneNumber2 = activeNumbersList[1];
  assert.equal(phoneNumber2.voiceConfiguration?.type, 'EST');
  assert.ok(phoneNumber2.voiceConfiguration?.trunkId !== '');
  const phoneNumber3 = activeNumbersList[2];
  assert.equal(phoneNumber3.voiceConfiguration?.type, 'RTC');
  assert.ok(phoneNumber3.voiceConfiguration?.appId !== '');
});

When('I send a request to update the phone number {string}', async (phoneNumber: string) => {
  activeNumber = await activeNumberApi.update({
    phoneNumber,
    updateActiveNumberRequestBody: {
      displayName: 'Updated description during E2E tests',
      smsConfiguration: {
        servicePlanId: 'SingingMooseSociety',
      },
      voiceConfiguration: {
        type: 'FAX',
        serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
      },
      callbackUrl: 'https://my-callback-server.com/numbers',
    },
  });
});

Then('the response contains a phone number with updated parameters', () => {
  assert.equal(activeNumber.displayName, 'Updated description during E2E tests');
  assert.equal(activeNumber.callbackUrl, 'https://my-callback-server.com/numbers');
  const smsConfiguration: Numbers.SMSConfiguration = {
    servicePlanId: 'SpaceMonkeySquadron',
    campaignId: '',
    scheduledProvisioning: {
      servicePlanId: 'SingingMooseSociety',
      campaignId: '',
      status: 'WAITING',
      lastUpdatedTime: new Date('2024-06-06T20:02:20.432220Z'),
      errorCodes: [],
    },
  };
  assert.deepEqual(activeNumber.smsConfiguration, smsConfiguration);
  const voiceVonfiguration: Numbers.VoiceConfiguration = {
    type: 'RTC',
    appId: 'sunshine-rain-drop-very-beautifulday',
    trunkId: '',
    serviceId: '',
    lastUpdatedTime: null,
    scheduledVoiceProvisioning: {
      status: 'WAITING',
      type: 'FAX',
      appId: '',
      trunkId: '',
      serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
      lastUpdatedTime: new Date('2024-06-06T20:02:20.437509Z'),
    },
  };
  assert.deepEqual(activeNumber.voiceConfiguration, voiceVonfiguration);
});

When('I send a request to retrieve the phone number {string}', async (phoneNumber: string) => {
  try {
    activeNumber = await activeNumberApi.get({ phoneNumber });
  } catch (e) {
    error = e;
  }
});

Then('the response contains details about the phone number {string}', (phoneNumber: string) => {
  assert.equal(activeNumber.phoneNumber, phoneNumber);
  assert.deepEqual(activeNumber.nextChargeDate, new Date('2024-06-06T14:42:42.677575Z'));
  assert.equal(activeNumber.expireAt, null);
  assert.equal(activeNumber.smsConfiguration?.servicePlanId, 'SpaceMonkeySquadron');
});

// eslint-disable-next-line max-len
Then('the response contains details about the phone number {string} with an SMS provisioning error', (phoneNumber: string) => {
  assert.equal(activeNumber.phoneNumber, phoneNumber);
  assert.deepEqual(activeNumber.nextChargeDate, new Date('2024-07-06T14:42:42.677575Z'));
  assert.equal(activeNumber.expireAt, null);
  assert.equal(activeNumber.smsConfiguration?.servicePlanId, '');
  assert.equal(activeNumber.smsConfiguration?.scheduledProvisioning?.status, 'FAILED');
  assert.deepEqual(activeNumber.smsConfiguration?.scheduledProvisioning?.errorCodes, ['SMS_PROVISIONING_FAILED']);
});

Then('the response contains an error about the number {string} not being an active number', (phoneNumber: string) => {
  const notFound = JSON.parse(error.data) as Numbers.NotFound;
  const notFoundError = notFound.error!;
  assert.equal(notFoundError.code, 404);
  assert.equal(notFoundError.status, 'NOT_FOUND');
  assert.equal((notFoundError.details![0] as any).resourceName, phoneNumber);
});

When('I send a request to release the phone number {string}', async (phoneNumber: string) => {
  activeNumber = await activeNumberApi.release({ phoneNumber });
});

Then('the response contains details about the phone number {string} to be released', (phoneNumber: string) => {
  assert.equal(activeNumber.phoneNumber, phoneNumber);
  assert.deepEqual(activeNumber.nextChargeDate, new Date('2024-06-06T14:42:42.677575Z'));
  assert.deepEqual(activeNumber.expireAt, new Date('2024-06-06T14:42:42.677575Z'));
});
