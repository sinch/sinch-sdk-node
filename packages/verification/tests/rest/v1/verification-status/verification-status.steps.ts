import { VerificationStatusApi, VerificationService, Verification  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let verificationStatusApi: VerificationStatusApi;
let smsVerificationStatus: Verification.SmsVerificationStatusResponse;
let phoneCallVerificationStatus: Verification.PhoneCallVerificationStatusResponse;
let flashCallVerificationStatus: Verification.FlashCallVerificationStatusResponse;

Given('the Verification service "Status" is available', () => {
  const verificationService = new VerificationService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    verificationHostname: 'http://localhost:3018',
  });
  verificationStatusApi = verificationService.verificationStatus;
});

When('I send a request to retrieve a SMS verification status by its verification ID', async () => {
  smsVerificationStatus = await verificationStatusApi.getById({
    id: '1ce0ffee-c0de-5eed-d00d-f00dfeed1337',
  }) as Verification.SmsVerificationStatusResponse;
});

Then('the response contains the details of the SMS verification status', () => {
  assert.equal(smsVerificationStatus.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(smsVerificationStatus.method, 'sms');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(smsVerificationStatus.status, successfulStatus);
  const verificationPrice: Verification.VerificationPriceSms = {
    verificationPrice: {
      currencyId: 'EUR',
      amount: 0.0453,
    },
  };
  assert.deepEqual(smsVerificationStatus.price, verificationPrice);
  const identity: Verification.Identity = {
    type: 'number',
    endpoint: '+33612345678',
  };
  assert.deepEqual(smsVerificationStatus.identity, identity);
  assert.equal(smsVerificationStatus.countryId, 'FR');
  assert.deepEqual(smsVerificationStatus.verificationTimestamp, new Date('2024-06-06T09:08:41.4784877Z'));
});

When('I send a request to retrieve a Phone Call verification status by the phone number to verify', async () => {
  phoneCallVerificationStatus = await verificationStatusApi.getByIdentity({
    method: 'phonecall',
    endpoint: '+33612345678',
  }) as Verification.PhoneCallVerificationStatusResponse;
});

Then('the response contains the details of the Phone Call verification status', () => {
  assert.equal(phoneCallVerificationStatus.id, '1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(phoneCallVerificationStatus.method, 'callout');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(phoneCallVerificationStatus.status, successfulStatus);
  const verificationPrice: Verification.VerificationPriceCall = {
    verificationPrice: {
      currencyId: 'EUR',
      amount: 0.1852,
    },
    terminationPrice: {
      currencyId: 'EUR',
      amount: 0,
    },
  };
  assert.deepEqual(phoneCallVerificationStatus.price, verificationPrice);
  const identity: Verification.Identity = {
    type: 'number',
    endpoint: '+33612345678',
  };
  assert.deepEqual(phoneCallVerificationStatus.identity, identity);
  assert.equal(phoneCallVerificationStatus.countryId, 'FR');
  assert.deepEqual(phoneCallVerificationStatus.verificationTimestamp, new Date('2024-06-06T09:10:27.7264837Z'));
  assert.equal(phoneCallVerificationStatus.callComplete, true);
  const answeredCallResult: Verification.CallResult = 'ANSWERED';
  assert.equal(phoneCallVerificationStatus.callResult, answeredCallResult);
});

When('I send a request to retrieve a Flash Call verification status by its reference', async () => {
  flashCallVerificationStatus = await verificationStatusApi.getByReference({
    reference: 'flashcall-verification-test-e2e',
  }) as Verification.FlashCallVerificationReportResponse;
});

Then('the response contains the details of the Flash Call verification status', () => {
  assert.equal(flashCallVerificationStatus.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(flashCallVerificationStatus.method, 'flashcall');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(flashCallVerificationStatus.status, successfulStatus);
  assert.equal(flashCallVerificationStatus.reference, 'flashcall-verification-test-e2e');
  const verificationPrice: Verification.VerificationPriceCall = {
    verificationPrice: {
      currencyId: 'EUR',
      amount: 0.0205,
    },
    terminationPrice: {
      currencyId: 'EUR',
      amount: 0,
    },
  };
  assert.deepEqual(flashCallVerificationStatus.price, verificationPrice);
  const identity: Verification.Identity = {
    type: 'number',
    endpoint: '+33612345678',
  };
  assert.deepEqual(flashCallVerificationStatus.identity, identity);
  assert.equal(flashCallVerificationStatus.countryId, 'FR');
  assert.deepEqual(flashCallVerificationStatus.verificationTimestamp, new Date('2024-06-06T09:07:32.3554646Z'));
  assert.equal(flashCallVerificationStatus.callComplete, true);
  const answeredCallResult: Verification.CallResult = 'ANSWERED';
  assert.equal(flashCallVerificationStatus.callResult, answeredCallResult);
});
