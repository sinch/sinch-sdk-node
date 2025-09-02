import { VerificationsApi, VerificationService, Verification  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let reportVerificationApi: VerificationsApi;
let reportSmsResponse: Verification.SmsVerificationReportResponse;
let reportPhoneCallResponse: Verification.PhoneCallVerificationReportResponse;
let reportFlashCallResponse: Verification.FlashCallVerificationReportResponse;
let reportWhatsAppResponse: Verification.WhatsAppVerificationReportResponse;

Given('the Verification service "Report" is available', () => {
  const verificationService = new VerificationService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    verificationHostname: 'http://localhost:3018',
  });
  reportVerificationApi = verificationService.verifications;
});

// eslint-disable-next-line max-len
When('I send a request to report an SMS verification by {string} with the verification ID {string}', async (_method: string, verificationId: string) => {
  reportSmsResponse = await reportVerificationApi.reportSmsById({
    id: verificationId,
    reportSmsVerificationByIdRequestBody: {
      sms: {
        code: 'OQP1',
      },
    },
  });
});

// eslint-disable-next-line max-len
When('I send a request to report an SMS verification by {string} with the phone number {string}', async (_method: string, phoneNumber: string) => {
  reportSmsResponse = await reportVerificationApi.reportSmsByIdentity({
    endpoint: phoneNumber,
    reportSmsVerificationByIdentityRequestBody: {
      sms: {
        code: 'OQP1',
      },
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the response by {string} contains the details of an SMS verification report', (_method: string) => {
  assert.equal(reportSmsResponse.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(reportSmsResponse.method, 'sms');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportSmsResponse.status, successfulStatus);
});

// eslint-disable-next-line max-len
When('I send a request to report a Phone Call verification by {string} with the verification ID {string}', async (_method: string, verificationId: string) => {
  reportPhoneCallResponse = await reportVerificationApi.reportPhoneCallById({
    id: verificationId,
    reportPhoneCallVerificationByIdRequestBody: {
      phoneCall: {
        code: '123456',
      },
    },
  });
});

// eslint-disable-next-line max-len
When('I send a request to report a Phone Call verification by {string} with the phone number {string}', async (_method: string, phoneNumber: string) => {
  reportPhoneCallResponse = await reportVerificationApi.reportPhoneCallByIdentity({
    endpoint: phoneNumber,
    reportPhoneCallVerificationByIdentityRequestBody: {
      phoneCall: {
        code: '123456',
      },
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the response by {string} contains the details of a Phone Call verification report', (_method: string) => {
  assert.equal(reportPhoneCallResponse.id, '1ce0ffee-c0de-5eed-d11d-f00dfeed1337');
  assert.equal(reportPhoneCallResponse.method, 'callout');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportPhoneCallResponse.status, successfulStatus);
  assert.equal(reportPhoneCallResponse.callComplete, true);
});

// eslint-disable-next-line max-len
When('I send a request to report a Flash Call verification by {string} with the verification ID {string}', async (_method: string, verificationId: string) => {
  reportFlashCallResponse = await reportVerificationApi.reportFlashCallById({
    id: verificationId,
    reportFlashCallVerificationByIdRequestBody: {
      flashCall: {
        cli: '+18156540001',
      },
    },
  });
});

// eslint-disable-next-line max-len
When('I send a request to report a Flash Call verification by {string} with the phone number {string}', async (_method: string, phoneNumber: string) => {
  reportFlashCallResponse = await reportVerificationApi.reportFlashCallByIdentity({
    endpoint: phoneNumber,
    reportFlashCallVerificationByIdentityRequestBody: {
      flashCall: {
        cli: '+18156540001',
      },
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the response by {string} contains the details of a Flash Call verification report', (_method: string) => {
  assert.equal(reportFlashCallResponse.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(reportFlashCallResponse.method, 'flashcall');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportFlashCallResponse.status, successfulStatus);
  assert.equal(reportFlashCallResponse.reference, 'flashcall-verification-test-e2e');
  assert.equal(reportFlashCallResponse.callComplete, true);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the response by {string} contains the details of a failed Flash Call verification report', (_method: string) => {
  assert.equal(reportFlashCallResponse.id, '1ce0ffee-c0de-5eed-d22d-f00dfeed1337');
  assert.equal(reportFlashCallResponse.method, 'flashcall');
  const failStatus: Verification.VerificationStatusEnum = 'FAIL';
  assert.equal(reportFlashCallResponse.status, failStatus);
  const expiredReason: Verification.ReasonEnum = 'Expired';
  assert.equal(reportFlashCallResponse.reason, expiredReason);
  assert.equal(reportFlashCallResponse.callComplete, true);
});

// eslint-disable-next-line max-len
When('I send a request to report a WhatsApp verification by {string} with the verification ID {string}', async (_method: string, verificationId: string) => {
  reportWhatsAppResponse = await reportVerificationApi.reportWhatsAppById({
    id: verificationId,
    reportWhatsAppVerificationByIdRequestBody: {
      whatsapp: {
        code: '1234',
      },
    },
  });
});

// eslint-disable-next-line max-len
When('I send a request to report a WhatsApp verification by {string} with the phone number {string}', async (_method: string, phoneNumber: string) => {
  reportWhatsAppResponse = await reportVerificationApi.reportWhatsAppByIdentity({
    endpoint: phoneNumber,
    reportWhatsAppVerificationByIdentityRequestBody: {
      whatsapp: {
        code: '5678',
      },
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the response by {string} contains the details of a WhatsApp verification report', (_method: string) => {
  assert.equal(reportWhatsAppResponse.id, '1ce0ffee-c0de-5eed-d33d-f00dfeed1337');
  assert.equal(reportWhatsAppResponse.method, 'whatsapp');
  const successfulStatus: Verification.VerificationStatusEnum = 'SUCCESSFUL';
  assert.equal(reportWhatsAppResponse.status, successfulStatus);
});
