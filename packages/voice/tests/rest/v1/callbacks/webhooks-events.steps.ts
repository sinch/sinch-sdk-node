import { VoiceCallbackWebhooks, Voice } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { IncomingHttpHeaders } from 'http';

let voiceCallbackWebhooks: VoiceCallbackWebhooks;
let rawEvent: any;
let event: Voice.VoiceCallbackEvent;
let formattedHeaders: IncomingHttpHeaders;

const processEvent = async (response: Response) => {
  formattedHeaders = {};
  response.headers.forEach((value, name) => {
    formattedHeaders[name.toLowerCase()] = value;
  });
  rawEvent = await response.text();
  event = voiceCallbackWebhooks.parseEvent(JSON.parse(rawEvent));
};


Given('the Voice Webhooks handler is available', () => {
  voiceCallbackWebhooks = new VoiceCallbackWebhooks({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
  });
});

When('I send a request to trigger a "PIE" event with a "return" type', async () => {
  const response = await fetch('http://localhost:3019/webhooks/voice/pie-return');
  await processEvent(response);
});

Then('the header of the "PIE" event with a "return" type contains a valid authorization', () => {
  assert.ok(voiceCallbackWebhooks.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/voice',
    'POST'));
});

Then('the Voice event describes a "PIE" event with a "return" type', () => {
  const pieEvent = event as Voice.PieRequest;
  assert.equal(pieEvent.callid, '1ce0ffee-ca11-ca11-ca11-abcdef000013');
  assert.equal(pieEvent.event, 'pie');
  const menuResult: Voice.MenuResult = {
    type: 'return',
    value: 'cancel',
    menuId: 'main',
    inputMethod: 'dtmf',
  };
  assert.ok(pieEvent.menuResult);
  assert.equal(pieEvent.menuResult.type, menuResult.type);
  assert.equal(pieEvent.menuResult.value, menuResult.value);
  assert.equal(pieEvent.menuResult.menuId, menuResult.menuId);
  assert.equal(pieEvent.menuResult.inputMethod, menuResult.inputMethod);
  assert.equal(pieEvent.version, 1);
  assert.equal(pieEvent.custom, 'Custom text');
  assert.equal(pieEvent.applicationKey, 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3');
});

When('I send a request to trigger a "PIE" event with a "sequence" type', async () => {
  const response = await fetch('http://localhost:3019/webhooks/voice/pie-sequence');
  await processEvent(response);
});

Then('the header of the "PIE" event with a "sequence" type contains a valid authorization', () => {
  assert.ok(voiceCallbackWebhooks.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/voice',
    'POST'));
});

Then('the Voice event describes a "PIE" event with a "sequence" type', () => {
  const pieEvent = event as Voice.PieRequest;
  assert.equal(pieEvent.callid, '1ce0ffee-ca11-ca11-ca11-abcdef000023');
  assert.equal(pieEvent.event, 'pie');
  const menuResult: Voice.MenuResult = {
    type: 'sequence',
    value: '1234',
    menuId: 'confirm',
    inputMethod: 'dtmf',
  };
  assert.ok(pieEvent.menuResult);
  assert.equal(pieEvent.menuResult.type, menuResult.type);
  assert.equal(pieEvent.menuResult.value, menuResult.value);
  assert.equal(pieEvent.menuResult.menuId, menuResult.menuId);
  assert.equal(pieEvent.menuResult.inputMethod, menuResult.inputMethod);
  assert.equal(pieEvent.version, 1);
  assert.equal(pieEvent.custom, 'Custom text');
  assert.equal(pieEvent.applicationKey, 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3');
});

When('I send a request to trigger a "DICE" event', async () => {
  const response = await fetch('http://localhost:3019/webhooks/voice/dice');
  await processEvent(response);
});

Then('the header of the "DICE" event contains a valid authorization', () => {
  assert.ok(voiceCallbackWebhooks.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/voice',
    'POST'));
});

Then('the Voice event describes a "DICE" event', () => {
  const diceEvent = event as Voice.DiceRequest;
  assert.equal(diceEvent.callid, '1ce0ffee-ca11-ca11-ca11-abcdef000033');
  assert.equal(diceEvent.event, 'dice');
  const reason: Voice.ReasonEnum = 'MANAGERHANGUP';
  assert.equal(diceEvent.reason, reason);
  const result: Voice.ResultEnum = 'ANSWERED';
  assert.equal(diceEvent.result, result);
  assert.equal(diceEvent.version, 1);
  assert.equal(diceEvent.custom, 'Custom text');
  const debit: Voice.VoicePrice = {
    currencyId: 'EUR',
    amount: 0.0095,
  };
  assert.deepEqual(diceEvent.userRate, debit);
  const userRate: Voice.VoicePrice = {
    currencyId: 'EUR',
    amount: 0.0095,
  };
  assert.deepEqual(diceEvent.userRate, userRate);
  const destinationParticipant: Voice.Participant = {
    type: 'number',
    endpoint: '12017777777',
  };
  assert.deepEqual(diceEvent.to, destinationParticipant);
  assert.equal(diceEvent.applicationKey, 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3');
  assert.equal(diceEvent.duration, 12);
  assert.equal(diceEvent.from, '12015555555');
});

When('I send a request to trigger a "ACE" event', async () => {
  const response = await fetch('http://localhost:3019/webhooks/voice/ace');
  await processEvent(response);
});

Then('the header of the "ACE" event contains a valid authorization', () => {
  assert.ok(voiceCallbackWebhooks.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    '/webhooks/voice',
    'POST'));
});

Then('the Voice event describes a "ACE" event', () => {
  const aceEvent = event as Voice.AceRequest;
  assert.equal(aceEvent.callid, '1ce0ffee-ca11-ca11-ca11-abcdef000043');
  assert.equal(aceEvent.event, 'ace');
  assert.deepEqual(aceEvent.timestamp, new Date('2024-06-06T17:10:34Z'));
  assert.equal(aceEvent.version, 1);
  assert.equal(aceEvent.custom, 'Custom text');
  assert.equal(aceEvent.applicationKey, 'f00dcafe-abba-c0de-1dea-dabb1ed4caf3');
});
