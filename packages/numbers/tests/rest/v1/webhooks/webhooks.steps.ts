import { Given, Then, When } from '@cucumber/cucumber';
import { NumbersCallbackWebhooks, Numbers } from '../../../../src';
import assert from 'assert';
import { IncomingHttpHeaders } from 'http';

const SINCH_NUMBERS_CALLBACK_SECRET = 'strongPa$$PhraseWith36CharactersMax';
let numbersCallbackWebhook: NumbersCallbackWebhooks;
let rawEvent: any;
let event: Numbers.CallbackPayload;
let formattedHeaders: IncomingHttpHeaders;

const processEvent = async (response: Response) => {
  formattedHeaders = {};
  response.headers.forEach((value, name) => {
    formattedHeaders[name.toLowerCase()] = value;
  });
  rawEvent = await response.text();
  rawEvent = rawEvent.replace(/\s+/g, '');
  event = numbersCallbackWebhook.parseEvent(JSON.parse(rawEvent));
};

Given('the Numbers Webhooks handler is available', function () {
  numbersCallbackWebhook = new NumbersCallbackWebhooks(SINCH_NUMBERS_CALLBACK_SECRET);
});

When('I send a request to trigger the success to provision to voice platform event', async () => {
  const response = await fetch('http://localhost:3013/webhooks/numbers/provisioning_to_voice_platform/succeeded');
  await processEvent(response);
});

Then('the event header contains a valid signature', () => {
  assert.ok(numbersCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the event describes a success to provision to voice platform event', () => {
  assert.equal(event.eventType, 'PROVISIONING_TO_VOICE_PLATFORM');
  assert.equal(event.status, 'SUCCEEDED');
  assert.equal(event.failureCode, null);
});

When('I send a request to trigger the failure to provision to voice platform event', async () => {
  const response = await fetch('http://localhost:3013/webhooks/numbers/provisioning_to_voice_platform/failed');
  await processEvent(response);
});

Then('the event describes a failure to provision to voice platform event', () => {
  assert.equal(event.eventType, 'PROVISIONING_TO_VOICE_PLATFORM');
  assert.equal(event.status, 'FAILED');
  assert.equal(event.failureCode, 'PROVISIONING_TO_VOICE_PLATFORM_FAILED');
});
