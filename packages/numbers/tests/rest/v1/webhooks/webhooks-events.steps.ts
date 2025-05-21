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
  formattedHeaders = Object.fromEntries(response.headers.entries());
  rawEvent = await response.text();
  event = numbersCallbackWebhook.parseEvent(rawEvent);
};

Given('the Numbers Webhooks handler is available', function () {
  numbersCallbackWebhook = new NumbersCallbackWebhooks(SINCH_NUMBERS_CALLBACK_SECRET);
});

When('I send a request to trigger the "success" for "PROVISIONING_TO_VOICE_PLATFORM" event', async () => {
  const response = await fetch('http://localhost:3013/webhooks/numbers/provisioning_to_voice_platform/succeeded');
  await processEvent(response);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Then('the header of the "{}" for "{}" event contains a valid signature', (_state, _event) => {
  assert.ok(numbersCallbackWebhook.validateAuthenticationHeader(formattedHeaders, rawEvent));
});

Then('the event describes a "success" for "PROVISIONING_TO_VOICE_PLATFORM" event', () => {
  assert.equal(event.eventType, 'PROVISIONING_TO_VOICE_PLATFORM');
  assert.equal(event.status, 'SUCCEEDED');
  assert.equal(event.failureCode, null);
});

When('I send a request to trigger the "failure" for "PROVISIONING_TO_VOICE_PLATFORM" event', async () => {
  const response = await fetch('http://localhost:3013/webhooks/numbers/provisioning_to_voice_platform/failed');
  await processEvent(response);
});

Then('the event describes a "failure" for "PROVISIONING_TO_VOICE_PLATFORM" event', () => {
  assert.equal(event.eventType, 'PROVISIONING_TO_VOICE_PLATFORM');
  assert.equal(event.status, 'FAILED');
  assert.equal(event.failureCode, 'PROVISIONING_TO_VOICE_PLATFORM_FAILED');
});
