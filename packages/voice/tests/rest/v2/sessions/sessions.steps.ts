import { VoiceV2SessionsApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { mockserverHosts } from '../../../e2e/hosts';

let sessionsApi: VoiceV2SessionsApi;
let session: Voice.v2.Session;

Given('the Voice-V2 service "Sessions" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  sessionsApi = voiceService.v2.sessions;
});

When('I send a request to get a session', async () => {
  session = await sessionsApi.get({
    sessionId: '01J7K3X9M2P5R8V0W4Y6Z1A3B5',
  });
});

Then('the response contains the session details', () => {
  assert.equal(session.sessionId, '01J7K3X9M2P5R8V0W4Y6Z1A3B5');
  assert.equal(session.serviceId, 'e52d19b4-03fa-4e89-a901-d78b12f6a9e2');
  assert.equal(session.projectId, 'a8f3b91c-4e2d-4190-883a-71b5c92e31d4');
  assert.equal(session.state, 'COMPLETED');
  assert.deepEqual(session.createTime, new Date('2026-08-28T12:17:18Z'));
  assert.deepEqual(session.endTime, new Date('2026-08-28T12:17:49Z'));
  assert.deepEqual(session.updateTime, new Date('2026-08-28T12:17:49Z'));
  assert.equal(session.calls.length, 1);

  const call = session.calls[0];
  assert.equal(call.callId, '01J7K3Y2N4Q6S9W1X5Z7A2B4C6');
  assert.equal(call.serviceId, 'e52d19b4-03fa-4e89-a901-d78b12f6a9e2');
  assert.equal(call.projectId, 'a8f3b91c-4e2d-4190-883a-71b5c92e31d4');
  assert.equal(call.sessionId, '01J7K3X9M2P5R8V0W4Y6Z1A3B5');
  assert.equal(call.batchId, '01J7K3Z5P6R8T0X2Y7A9B3C5D7');
  assert.deepEqual(call.from, {
    type: 'PHONE',
    phone: {
      number: '+12015555555',
    },
  });
  assert.deepEqual(call.to, {
    type: 'PHONE',
    phone: {
      number: '+12017777777',
    },
  });
  assert.equal(call.direction, 'OUTBOUND');
  assert.equal(call.callResult, 'NO_ANSWER');
  assert.equal(call.callType, 'PHONE');
  assert.equal(call.originationType, 'SERVER');
  assert.deepEqual(call.startTime, new Date('2026-08-28T12:17:18Z'));
  assert.deepEqual(call.endTime, new Date('2026-08-28T12:17:49Z'));
  assert.deepEqual(call.updateTime, new Date('2026-08-28T12:17:49Z'));
  assert.equal(call.callDurationSeconds, 0);
  assert.deepEqual(call.callRate, {
    currencyCode: 'EUR',
    amount: '0.4085',
  });
  assert.equal(call.callReason, 'NOT_AVAILABLE');
  assert.equal(
    call.callResourceUrl,
    'https://eu1.voice.api.sinch.com/v2/projects/a8f3b91c-4e2d-4190-883a-71b5c92e31d4/calls/01J7K3Y2N4Q6S9W1X5Z7A2B4C6',
  );
});
