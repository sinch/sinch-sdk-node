import { VerificationsApi, VerificationService, Verification  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let reportVerificationApi: VerificationsApi;
let reportSmsResponse: Verification.SmsVerificationReportResponse;
let reportPhoneCallResponse: Verification.PhoneCallVerificationReportResponse;
let reportFlashCallResponse: Verification.FlashCallVerificationReportResponse;

Given('the Verification service "Report" is available', () => {
  const verificationService = new VerificationService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    verificationHostname: 'http://localhost:3018',
  });
  reportVerificationApi = verificationService.verifications;
});

When('I send a request to report an SMS verification with the verification ID', async () => {
  reportSmsResponse = await reportVerificationApi.reportSmsById({
    id: '1ce0ffee-c0de-5eed-d00d-f00dfeed1337',
    reportSmsVerificationByIdRequestBody: {
      sms: {
        code: 'OQP1',
      },
    },
  });
});

When('I send a request to report an SMS verification with the phone number', async () => {
  reportSmsResponse = await reportVerificationApi.reportSmsByIdentity({
    endpoint: '+46123456789',
    reportSmsVerificationByIdentityRequestBody: {
      sms: {
        code: 'OQP1',
      },
    },
  });
});

Then('the response contains the details of an SMS verification report', () => {
  assert.equal(reportSmsResponse.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(reportSmsResponse.method, 'sms');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportSmsResponse.status, successfulStatus);
});

When('I send a request to report a Phone Call verification with the verification ID', async () => {
  reportPhoneCallResponse = await reportVerificationApi.reportPhoneCallById({
    id: '1ce0ffee-c0de-5eed-d11d-f00dfeed1337',
    reportPhoneCallVerificationByIdRequestBody: {
      phoneCall: {
        code: '123456',
      },
    },
  });
});

When('I send a request to report a Phone Call verification with the phone number', async () => {
  reportPhoneCallResponse = await reportVerificationApi.reportPhoneCallByIdentity({
    endpoint: '+33612345678',
    reportPhoneCallVerificationByIdentityRequestBody: {
      phoneCall: {
        code: '123456',
      },
    },
  });
});

Then('the response contains the details of a Phone Call verification report', () => {
  assert.equal(reportPhoneCallResponse.id, '1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(reportPhoneCallResponse.method, 'callout');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportPhoneCallResponse.status, successfulStatus);
  assert.equal(reportPhoneCallResponse.callComplete, true);
});

When('I send a request to report a Flash Call verification with the verification ID', async () => {
  reportFlashCallResponse = await reportVerificationApi.reportFlashCallById({
    id: '1ce0ffee-c0de-5eed-d11d-f00dfeed1337',
    reportFlashCallVerificationByIdRequestBody: {
      flashCall: {
        cli: '+18156540001',
      },
    },
  });
});

When('I send a request to report a Flash Call verification with the phone number', async () => {
  reportFlashCallResponse = await reportVerificationApi.reportFlashCallByIdentity({
    endpoint: '+33612345678',
    reportFlashCallVerificationByIdentityRequestBody: {
      flashCall: {
        cli: '+18156540001',
      },
    },
  });
});

Then('the response contains the details of a Flash Call verification report', () => {
  assert.equal(reportFlashCallResponse.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(reportFlashCallResponse.method, 'flashcall');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportFlashCallResponse.status, successfulStatus);
  assert.equal(reportFlashCallResponse.reference, 'flashcall-verification-test-e2e');
  assert.equal(reportFlashCallResponse.callComplete, true);
});

Then('the response contains the details of a failed Flash Call verification report', () => {
  assert.equal(reportFlashCallResponse.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(reportFlashCallResponse.method, 'flashcall');
  const failStatus: Verification.VerificationStatusEnum = 'FAIL';
  assert.equal(reportFlashCallResponse.status, failStatus);
  const expiredReason: Verification.ReasonEnum = 'Expired';
  assert.equal(reportFlashCallResponse.reason, expiredReason);
  assert.equal(reportFlashCallResponse.callComplete, true);
});
