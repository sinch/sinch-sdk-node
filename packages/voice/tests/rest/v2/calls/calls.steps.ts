import { VoiceV2CallsApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';
import { mockserverHosts } from '../../../e2e/hosts';

let callsApi: VoiceV2CallsApi;
let callResponse: Voice.v2.CallResponse;
let call: Voice.v2.Call;
let listResponse: PageResult<Voice.v2.Call>;
let callsList: Voice.v2.Call[];
let pagesIteration: number;
let interactResponse: void;

const interactRequestBody: Voice.v2.CallPatchRequest = {
  commands: [
    {
      command: 'messages',
      messages: [
        {
          type: 'SAY',
          say: {
            text: 'Hello, your call is now connected.',
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
};

Given('the Voice-V2 service "Calls" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  callsApi = voiceService.v2.calls;
});

When('I send a request to start a call', async () => {
  callResponse = await callsApi.start({
    'Idempotency-Key': 'e2e-voice-v2-calls-start',
    createCallRequestBody: {
      commands: [
        {
          command: 'dial',
          callName: 'audio-notification',
          from: {
            type: 'PHONE',
            phone: {
              number: '+12015555555',
            },
          },
          to: {
            type: 'PHONE',
            phone: {
              number: '+12017777777',
            },
          },
          dialTimeoutDurationSeconds: 30,
          maxCallDurationSeconds: 300,
          events: {
            onAnswer: [
              {
                command: 'messages',
                messagesName: 'notification',
                messages: [
                  {
                    type: 'PLAY',
                    play: {
                      url: 'https://samplelib.com/mp3/sample-12s.mp3',
                    },
                  },
                  {
                    type: 'SAY',
                    say: {
                      text: 'Hello! This is a test notification from Sinch. Your verification code is 4 8 3 7.',
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
          },
        },
      ],
    },
  });
});

Then('the response contains the information about the call started', () => {
  assert.equal(callResponse.sessionId, '01HZXK7QNPMR8VD3JW9YF2C4TB');
  assert.equal(callResponse.projectId, 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789');
  assert.equal(callResponse.serviceId, 'f9e8d7c6-b5a4-4321-9876-c5d4e3f2a1b0');
});

When('I send a request to get call details', async () => {
  call = await callsApi.get({
    callId: '01HZXK8FQNPMR8VD3JW9YF2C5A',
  });
});

Then('the response contains the call details', () => {
  assert.equal(call.callId, '01HZXK8FQNPMR8VD3JW9YF2C5A');
  assert.equal(call.serviceId, 'f9e8d7c6-b5a4-4321-9876-c5d4e3f2a1b0');
  assert.equal(call.projectId, 'a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789');
  assert.equal(call.callName, 'audio-notification');
  assert.equal(call.sessionId, '01HZXK7QNPMR8VD3JW9YF2C4TB');
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
  assert.deepEqual(call.startTime, new Date('2026-09-14T10:24:34Z'));
  assert.deepEqual(call.endTime, new Date('2026-09-14T10:24:49Z'));
  assert.deepEqual(call.updateTime, new Date('2026-09-14T10:24:49Z'));
  assert.equal(call.callDurationSeconds, 0);
  assert.deepEqual(call.callRate, {
    currencyCode: 'EUR',
    amount: '0.4085',
  });
  assert.equal(call.callReason, 'NOT_AVAILABLE');
  assert.equal(
    call.callResourceUrl,
    'https://eu1.voice.api.sinch.com/v2/projects/a1b2c3d4-e5f6-4789-a012-b3c4d5e6f789/calls/01HZXK8FQNPMR8VD3JW9YF2C5A',
  );
});

When('I send a request to list calls', async () => {
  listResponse = await callsApi.list({
    pageSize: 2,
  });
});

Then('the response content contains {string} calls', (expectedAnswer: string) => {
  const expectedCallsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedCallsCount);
});

When('I send a request to list all the calls', async () => {
  callsList = [];
  for await (const listedCall of callsApi.list({ pageSize: 2 })) {
    callsList.push(listedCall);
  }
});

When('I iterate manually over the calls pages', async () => {
  callsList = [];
  listResponse = await callsApi.list({
    pageSize: 2,
  });
  callsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      callsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the calls list contains {string} calls', (expectedAnswer: string) => {
  const expectedCallsCount = parseInt(expectedAnswer, 10);
  assert.equal(callsList.length, expectedCallsCount);
});

Then('the calls iteration result contains the data from {string} pages', (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to interact with an ongoing call by call ID', async () => {
  interactResponse = await callsApi.interactByCallId({
    callId: '01HZXK8FQNPMR8VD3JW9YF2C5A',
    callPatchRequestBody: interactRequestBody,
  });
});

When('I send a request to interact with an ongoing call by call name', async () => {
  interactResponse = await callsApi.interactByCallName({
    sessionId: '01HZXK7QNPMR8VD3JW9YF2C4TB',
    callName: 'audio-notification',
    'Idempotency-Key': 'e2e-voice-v2-interact-by-call-name',
    callPatchRequestBody: interactRequestBody,
  });
});

Then('the response confirms the interaction request was accepted', () => {
  assert.deepEqual(interactResponse, {});
});
