import { VoiceV2SinchEvents, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { IncomingHttpHeaders } from 'http';
import { mockserverHosts } from '../../../e2e/hosts';

const SERVICE_ID = 'serviceKey';
const SERVICE_SECRET = 'BeIukql3pTKJ8RGL5zo0DA==';
const SIGNED_HTTP_METHOD = 'POST';

const EVENT_PATHS: Record<string, string> = {
  'call.incoming': '/webhooks/voice-v2/call/incoming',
  'call.answered': '/webhooks/voice-v2/call/answered',
  'call.webhook.on-answer': '/webhooks/voice-v2/call/webhook/on-answer',
};

const EXPECTED_CALL_ID = '01HZXK7QNPMR8VD3JW9YF2C4CA';
const EXPECTED_SESSION_ID = '01HZXK7QNPMR8VD3JW9YF2C4TB';
const EXPECTED_SERVICE_ID = 'f9e8d7c6-b5a4-4321-9876-c5d4e3f2a1b0';
const EXPECTED_PROJECT_ID = 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789';

let sinchEvents: VoiceV2SinchEvents;
let rawEvent: string;
let event: Voice.v2.WebhookRequest;
let formattedHeaders: IncomingHttpHeaders;
let eventPath: string;

const phoneNumber = (endpoint: Voice.v2.CallOrigin | Voice.v2.CallDestination | undefined): string | undefined => {
  return (endpoint as Voice.v2.Phone | undefined)?.phone?.number;
};

Given('the Voice-V2 Webhooks handler is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  sinchEvents = voiceService.v2.sinchEvents;
  sinchEvents.setCredentials({
    serviceId: SERVICE_ID,
    serviceSecret: SERVICE_SECRET,
  });
});

When(/^I send a request to trigger a "(call\.[^"]+)" event$/, async (eventType: string) => {
  eventPath = EVENT_PATHS[eventType];
  assert.ok(eventPath, `Unknown Voice-V2 webhook event "${eventType}"`);
  const response = await fetch(`${mockserverHosts.voiceV2Hostname}${eventPath}`);
  formattedHeaders = Object.fromEntries(response.headers.entries());
  rawEvent = await response.text();
  event = sinchEvents.parseEvent(rawEvent);
});

Then(/^the header of the "(call\.[^"]+)" event contains a valid authorization$/, (eventType: string) => {
  assert.ok(eventPath, `No webhook was fetched for "${eventType}"`);
  assert.ok(sinchEvents.validateAuthenticationHeader(
    formattedHeaders,
    rawEvent,
    eventPath,
    SIGNED_HTTP_METHOD,
  ), `Authorization validation failed for event "${eventType}"`);
});

Then('the Voice-V2 event describes a {string} event', (eventType: string) => {
  assert.equal(event.event, eventType);
  assert.equal(event.call.callId, EXPECTED_CALL_ID);
  assert.equal(event.call.sessionId, EXPECTED_SESSION_ID);
  assert.equal(event.call.serviceId, EXPECTED_SERVICE_ID);
  assert.equal(event.call.projectId, EXPECTED_PROJECT_ID);
  assert.equal(event.call.callType, 'PHONE');
  assert.deepEqual(event.call.startTime, new Date('2026-09-04T10:14:55.0000000'));
  assert.deepEqual(event.call.callRate, {
    currencyCode: 'EUR',
    amount: '0.0095',
  });
  assert.equal(
    event.call.callResourceUrl,
    `/v2/projects/${EXPECTED_PROJECT_ID}/calls/${EXPECTED_CALL_ID}`,
  );

  if (eventType === 'call.incoming') {
    assert.equal(event.call.direction, 'INBOUND');
    assert.equal(event.call.callResult, 'INITIATED');
    assert.equal(event.call.originationType, 'PHONE');
    assert.equal(phoneNumber(event.call.from), '+12015555555');
    assert.equal(phoneNumber(event.call.to), '+12017777777');
    assert.equal(event.call.answerTime, undefined);
    return;
  }

  assert.equal(event.call.direction, 'OUTBOUND');
  assert.equal(event.call.callResult, 'IN_PROGRESS');
  assert.equal(event.call.originationType, 'SERVER');
  assert.equal(phoneNumber(event.call.from), '+12017777777');
  assert.equal(phoneNumber(event.call.to), '+12015555555');
  assert.deepEqual(event.call.answerTime, new Date('2026-09-04T10:14:58.0000000'));
  assert.deepEqual(event.call.updateTime, new Date('2026-09-04T10:14:58.0000000'));
});

Then('the response to the {string} event matches the expected call control instructions', async (eventType: string) => {
  assert.ok(eventPath, `No webhook was fetched for "${eventType}"`);
  const body = sinchEvents.serializeResponse({
    commands: [
      {
        command: 'messages',
        messagesName: 'from-webhook-server',
        messages: [
          {
            type: 'SAY',
            say: {
              text: 'This message came from your local webhook server.',
              voiceName: 'Emma',
            },
          },
        ],
        events: {
          onFinish: [
            {
              command: 'hangup',
            },
          ],
        },
      },
    ],
  });
  const confirmation = await fetch(`${mockserverHosts.voiceV2Hostname}${eventPath}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  assert.equal(
    confirmation.status,
    200,
    `Expected 200 confirming call control instructions for "${eventType}", got ${confirmation.status}: ${await confirmation.text()}`,
  );
});
