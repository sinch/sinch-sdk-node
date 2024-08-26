import { VerificationsApi, VerificationService, Verification  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { RequestFailedError } from '@sinch/sdk-client/src';

let startVerificationApi: VerificationsApi;
let startSmsVerificationResponse: Verification.StartSmsVerificationResponse;
let startPhoneCallVerificationResponse: Verification.StartPhoneCallVerificationResponse;
let startFlashCallVerificationResponse: Verification.StartFlashCallVerificationResponse;
let startDataVerificationResponseError: RequestFailedError<string>;

Given('the Verification service "Start" is available', () => {
  const verificationService = new VerificationService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    verificationHostname: 'http://localhost:3018',
  });
  startVerificationApi = verificationService.verifications;
});

When('I send a request to start a verification with a SMS', async () => {
  startSmsVerificationResponse = await startVerificationApi.startSms({
    startVerificationWithSmsRequestBody: {
      identity: {
        type: 'number',
        endpoint: '+46123456789',
      },
      smsOptions: {
        codeType: 'Alphanumeric',
        locale: 'sv-SE',
      },
    },
  });
});

Then('the response contains the details of a verification started with a SMS', () => {
  assert.equal(startSmsVerificationResponse.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(startSmsVerificationResponse.method, 'sms');
  assert.ok(startSmsVerificationResponse.sms);
  assert.equal(startSmsVerificationResponse.sms.template, 'Din verifieringskod är {{CODE}}.');
  assert.equal(startSmsVerificationResponse.sms.interceptionTimeout, 198);
  assert.ok(startSmsVerificationResponse._links);
  const statusLink = startSmsVerificationResponse._links[0];
  assert.equal(statusLink.rel, 'status');
  assert.equal(statusLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(statusLink.method, 'GET');
  const reportLink = startSmsVerificationResponse._links[1];
  assert.equal(reportLink.rel, 'report');
  assert.equal(reportLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(reportLink.method, 'PUT');
});

When('I send a request to start a verification with a Phone Call', async () => {
  startPhoneCallVerificationResponse = await startVerificationApi.startPhoneCall({
    startVerificationWithPhoneCallRequestBody: {
      identity: {
        type: 'number',
        endpoint: '+33612345678',
      },
      phoneCallOptions: {
        speech: {
          locale: 'fr-FR',
        },
      },
    },
  });
});

Then('the response contains the details of a verification started with a Phone Call', () => {
  assert.equal(startPhoneCallVerificationResponse.id, '1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(startPhoneCallVerificationResponse.method, 'callout');
  assert.ok(startPhoneCallVerificationResponse._links);
  const statusLink = startPhoneCallVerificationResponse._links[0];
  assert.equal(statusLink.rel, 'status');
  assert.equal(statusLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(statusLink.method, 'GET');
  const reportLink = startPhoneCallVerificationResponse._links[1];
  assert.equal(reportLink.rel, 'report');
  assert.equal(reportLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(reportLink.method, 'PUT');
});

When('I send a request to start a verification with a Flash Call', async () => {
  startFlashCallVerificationResponse = await startVerificationApi.startFlashCall({
    startVerificationWithFlashCallRequestBody: {
      identity: {
        type: 'number',
        endpoint: '+33612345678',
      },
      flashCallOptions: {
        dialTimeout: 10,
      },
      reference: 'flashcall-verification-test-e2e',
    },
  });
});

Then('the response contains the details of a verification started with a Flash Call', () => {
  assert.equal(startFlashCallVerificationResponse.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(startFlashCallVerificationResponse.method, 'flashcall');
  assert.ok(startFlashCallVerificationResponse.flashCall);
  assert.equal(startFlashCallVerificationResponse.flashCall.cliFilter, '(.*)8156(.*)');
  assert.equal(startFlashCallVerificationResponse.flashCall.interceptionTimeout, 45);
  assert.equal(startFlashCallVerificationResponse.flashCall.reportTimeout, 75);
  assert.equal(startFlashCallVerificationResponse.flashCall.denyCallAfter, 0);
  assert.ok(startFlashCallVerificationResponse._links);
  const statusLink = startFlashCallVerificationResponse._links[0];
  assert.equal(statusLink.rel, 'status');
  assert.equal(statusLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(statusLink.method, 'GET');
  const reportLink = startFlashCallVerificationResponse._links[1];
  assert.equal(reportLink.rel, 'report');
  assert.equal(reportLink.href, 'http://localhost:3018/verification/v1/verifications/id/1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(reportLink.method, 'PUT');
});

When('I send a request to start a Data verification for a not available destination', async () => {
  try {
    await startVerificationApi.startData({
      startDataVerificationRequestBody: {
        identity: {
          type: 'number',
          endpoint: '+17818880008',
        },
      },
    });
  } catch (e: any) {
    startDataVerificationResponseError = e as RequestFailedError<string>;
  }
});

Then('the response contains the error details of a Data verification', () => {
  assert.equal(startDataVerificationResponseError.statusCode, 403);
  assert.ok(startDataVerificationResponseError.data);
  const errorDetails = JSON.parse(startDataVerificationResponseError.data) as Verification.VerificationError;
  assert.equal(errorDetails.errorCode, 40300);
  assert.equal(errorDetails.message, 'Seamless verification not available for given destination.');
  assert.equal(errorDetails.reference, 'c01dc0de-c4db-44f1-5ca1-da9159d21c191');
});
