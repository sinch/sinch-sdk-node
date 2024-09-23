import { VerificationCallbackWebhooks, Verification } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { IncomingHttpHeaders } from 'http';

let verificationCallbackWebhook: VerificationCallbackWebhooks;
let rawEvent: any;
let event: Verification.VerificationCallbackEvent;
let formattedHeaders: IncomingHttpHeaders;

const processEvent = async (response: Response) => {
  formattedHeaders = {};
  response.headers.forEach((value, name) => {
    formattedHeaders[name.toLowerCase()] = value;
  });
  rawEvent = await response.text();
  event = verificationCallbackWebhook.parseEvent(JSON.parse(rawEvent));
};

Given('the Verification Webhooks handler is available', () => {
  verificationCallbackWebhook = new VerificationCallbackWebhooks({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
  });
});

When('I send a request to trigger a "Verification Request" event', async () => {
  const response = await fetch('http://localhost:3018/webhooks/verification/verification-request-event');
  await processEvent(response);
});

Then('the header of the Verification event "Verification Request" contains a valid authorization', () => {
  assert.ok(verificationCallbackWebhook.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/verification',
    'POST'));
});

Then('the Verification event describes a "Verification Request" event type', () => {
  const verificationRequestEvent = event as Verification.VerificationRequestEvent;
  assert.equal(verificationRequestEvent.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(verificationRequestEvent.event, 'VerificationRequestEvent');
  const smsVerificationMethod: Verification.MethodEnum = 'sms';
  assert.equal(verificationRequestEvent.method, smsVerificationMethod);
  const identity: Verification.Identity = {
    type: 'number',
    endpoint: '+33612345678',
  };
  assert.equal(verificationRequestEvent.identity.type, identity.type);
  assert.equal(verificationRequestEvent.identity.endpoint, identity.endpoint);
  const smsPrice: Verification.Price = {
    currencyId: 'EUR',
    amount: 0.0453,
  };
  assert.deepEqual(verificationRequestEvent.price, smsPrice);
  const smsRate: Verification.Price = {
    currencyId: 'EUR',
    amount: 0,
  };
  assert.deepEqual(verificationRequestEvent.rate, smsRate);
});

When('I send a request to trigger a "Verification Result" event', async () => {
  const response = await fetch('http://localhost:3018/webhooks/verification/verification-result-event');
  await processEvent(response);
});

Then('the header of the Verification event "Verification Result" contains a valid authorization', () => {
  assert.ok(verificationCallbackWebhook.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/verification',
    'POST'));
});

Then('the Verification event describes a "Verification Result" event type', () => {
  const verificationRequestEvent = event as Verification.VerificationResultEvent;
  assert.equal(verificationRequestEvent.id, '1ce0ffee-c0de-5eed-d00d-f00dfeed1337');
  assert.equal(verificationRequestEvent.event, 'VerificationResultEvent');
  const smsVerificationMethod: Verification.MethodEnum = 'sms';
  assert.equal(verificationRequestEvent.method, smsVerificationMethod);
  const identity: Verification.Identity = {
    type: 'number',
    endpoint: '+33612345678',
  };
  assert.equal(verificationRequestEvent.identity.type, identity.type);
  assert.equal(verificationRequestEvent.identity.endpoint, identity.endpoint);
});
