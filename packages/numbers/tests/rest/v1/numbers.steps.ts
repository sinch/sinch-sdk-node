import { Given, Then, When } from '@cucumber/cucumber';
import { NumbersService, Numbers } from '../../../src';
import { PageResult } from '@sinch/sdk-client';
import assert from 'assert';

let numbersService: NumbersService;
let availableNumbersResponse: Numbers.AvailableNumbersResponse;
let availablePhoneNumber: Numbers.AvailableNumber;
let listActiveNumbersResponse: PageResult<Numbers.ActiveNumber>;
const activeNumbersList: Numbers.ActiveNumber[] = [];
let activeNumber: Numbers.ActiveNumber;
let error: any;

Given('the Numbers service is available', function () {
  numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
});

When('I send a request to search for available phone numbers', async () => {
  availableNumbersResponse = await numbersService.searchForAvailableNumbers({
    regionCode: 'US',
    type: 'LOCAL',
  });
});

Then('the response contains {string} available phone numbers', (expectedAnswer: string) => {
  const expectedPhoneNumbersCount = parseInt(expectedAnswer, 10);
  assert.equal(availableNumbersResponse.availableNumbers?.length, expectedPhoneNumbersCount);
});

Then('a phone number contains all the expected properties', () => {
  const phoneNumber = availableNumbersResponse.availableNumbers![0];
  assert.equal(phoneNumber.phoneNumber, '+12013504948');
  assert.equal(phoneNumber.regionCode, 'US');
  assert.equal(phoneNumber.type, 'LOCAL');
  assert.deepEqual(phoneNumber.capability, ['SMS', 'VOICE']);
  assert.deepEqual(phoneNumber.setupPrice, { currencyCode: 'EUR', amount: '0.80' });
  assert.deepEqual(phoneNumber.monthlyPrice, { currencyCode: 'EUR', amount: '0.80' });
  assert.equal(phoneNumber.paymentIntervalMonths, 1);
  assert.equal(phoneNumber.supportingDocumentationRequired, true);
});

When('I send a request to check the availability of the phone number {string}', async (phoneNumber: string) => {
  availablePhoneNumber = await numbersService.checkAvailability({ phoneNumber });
});

Then('the response displays the phone number {string} details', (phoneNumber: string) => {
  assert.equal(availablePhoneNumber.phoneNumber, phoneNumber);
});

Then('the response contains an error about the number {string} not being available', (phoneNumber: string) => {
  const notFound = availablePhoneNumber as Numbers.NotFound;
  const notFoundError = notFound.error!;
  assert.equal(notFoundError.code, 404);
  assert.equal(notFoundError.status, 'NOT_FOUND');
  assert.equal((notFoundError.details![0] as any).resourceName, phoneNumber);
});

When('I send a request to rent a number with some criteria', async () => {
  activeNumber = await numbersService.rentAny({
    rentAnyNumberRequestBody: {
      regionCode: 'US',
      type: 'LOCAL',
      capabilities: ['SMS', 'VOICE'],
      smsConfiguration: {
        servicePlanId: 'SpaceMonkeySquadron',
      },
      voiceConfiguration: {
        appId: 'sunshine-rain-drop-very-beautifulday',
      },
      numberPattern: {
        pattern: '7654321',
        searchPattern: 'END',
      },
    },
  });
});

Then('the response contains a rented phone number', () => {
  assert.equal(activeNumber.phoneNumber, '+12017654321');
  assert.equal(activeNumber.projectId, '123c0ffee-dada-beef-cafe-baadc0de5678');
  assert.equal(activeNumber.displayName, '');
  assert.equal(activeNumber.regionCode, 'US');
  assert.equal(activeNumber.type, 'LOCAL');
  assert.deepEqual(activeNumber.capability, ['SMS', 'VOICE']);
  assert.deepEqual(activeNumber.money, { currencyCode: 'EUR', amount: '0.80' });
  assert.equal(activeNumber.paymentIntervalMonths, 1);
  assert.deepEqual(activeNumber.nextChargeDate, new Date('2024-06-06T14:42:42.022227Z'));
  assert.equal(activeNumber.expireAt, null);
  const expectedSmsConfiguration: Numbers.SMSConfigurationResponse = {
    servicePlanId: '',
    campaignId: '',
    scheduledProvisioning: {
      servicePlanId: 'SpaceMonkeySquadron',
      campaignId: '',
      status: 'WAITING',
      lastUpdatedTime: new Date('2024-06-06T14:42:42.596223Z'),
      errorCodes: [],
    },
  };
  assert.deepEqual(activeNumber.smsConfiguration, expectedSmsConfiguration);
  const expectedVoiceConfiguration: Numbers.VoiceConfigurationResponse = {
    type: 'RTC',
    appId: '',
    trunkId: '',
    serviceId: '',
    lastUpdatedTime: null,
    scheduledVoiceProvisioning: {
      type: 'RTC',
      appId: 'sunshine-rain-drop-very-beautifulday',
      trunkId: '',
      serviceId: '',
      status: 'WAITING',
      lastUpdatedTime: new Date('2024-06-06T14:42:42.604092Z'),
    },
  };
  assert.deepEqual(activeNumber.voiceConfiguration, expectedVoiceConfiguration);
  assert.equal(activeNumber.callbackUrl, '');
});

When('I send a request to rent the phone number {string}', async (phoneNumber: string) => {
  activeNumber = await numbersService.rent({
    phoneNumber,
    rentNumberRequestBody: {
      smsConfiguration: {
        servicePlanId: 'SpaceMonkeySquadron',
      },
      voiceConfiguration: {
        appId: 'sunshine-rain-drop-very-beautifulday',
      },
    },
  });
});

Then('the response contains this rented phone number {string}', (phoneNumber: string) => {
  assert.equal(activeNumber.phoneNumber, phoneNumber);
});

When('I send a request to rent the unavailable phone number {string}', async (phoneNumber: string) => {
  activeNumber = await numbersService.rent({
    phoneNumber,
    rentNumberRequestBody: {
      smsConfiguration: {
        servicePlanId: 'SpaceMonkeySquadron',
      },
      voiceConfiguration: {
        appId: 'sunshine-rain-drop-very-beautifulday',
      },
    },
  });
});

When('I send a request to list the phone numbers', async () => {
  listActiveNumbersResponse = await numbersService.list({
    regionCode: 'US',
    type: 'LOCAL',
  });
});

Then('the response contains {string} phone numbers', (expectedAnswer: string) => {
  const expectedPhoneNumbersCount = parseInt(expectedAnswer, 10);
  assert.equal(listActiveNumbersResponse.data.length, expectedPhoneNumbersCount);
});

When('I send a request to list all the phone numbers', async () => {
  const requestData: Numbers.ListActiveNumbersRequestData = {
    regionCode: 'US',
    type: 'LOCAL',
  };
  for await (const number of numbersService.list(requestData)) {
    activeNumbersList.push(number);
  }
});

Then('the phone numbers list contains {string} phone numbers', (expectedAnswer: string) => {
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
  activeNumber = await numbersService.update({
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
  const smsConfiguration: Numbers.SMSConfigurationResponse = {
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
  const voiceVonfiguration: Numbers.VoiceConfigurationResponse = {
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
    activeNumber = await numbersService.get({ phoneNumber });
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

Then('the response contains an error about the number {string} not being a rented number', (phoneNumber: string) => {
  const notFound = JSON.parse(error.data) as Numbers.NotFound;
  const notFoundError = notFound.error!;
  assert.equal(notFoundError.code, 404);
  assert.equal(notFoundError.status, 'NOT_FOUND');
  assert.equal((notFoundError.details![0] as any).resourceName, phoneNumber);
});

When('I send a request to release the phone number {string}', async (phoneNumber: string) => {
  activeNumber = await numbersService.release({ phoneNumber });
});

Then('the response contains details about the phone number {string} to be released', (phoneNumber: string) => {
  assert.equal(activeNumber.phoneNumber, phoneNumber);
  assert.deepEqual(activeNumber.nextChargeDate, new Date('2024-06-06T14:42:42.677575Z'));
  assert.deepEqual(activeNumber.expireAt, new Date('2024-06-06T14:42:42.677575Z'));
});
