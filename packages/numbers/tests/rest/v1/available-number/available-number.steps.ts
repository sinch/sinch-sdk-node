import { NumbersService, Numbers } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

let numbersService: NumbersService;
let availableNumbersResponse: Numbers.AvailableNumbersResponse;
let availablePhoneNumber: Numbers.AvailableNumber;
let activeNumber: Numbers.ActiveNumber;

Given('the Numbers service "Available Number" is available', function () {
  numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
});

When('I send a request to list the available phone numbers', async () => {
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

Then('the response contains an active phone number', () => {
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
  const expectedSmsConfiguration: Numbers.SMSConfiguration = {
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
  const expectedVoiceConfiguration: Numbers.VoiceConfiguration = {
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

Then('the response contains this active phone number {string}', (phoneNumber: string) => {
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
