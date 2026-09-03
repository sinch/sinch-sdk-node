import { VoiceV2CallsApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { mockserverHosts } from '../../../e2e/hosts';

let callsApi: VoiceV2CallsApi;
let callResponse: Voice.v2.CallResponse;

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
  assert.equal(callResponse.batchId, undefined);
});

When('I send a request to start a batch of calls', async () => {
  callResponse = await callsApi.start({
    createCallRequestBody: {
      commands: [
        {
          command: 'dial',
          callName: 'batch-reminder',
          from: {
            type: 'PHONE',
            phone: {
              number: '+12015555555',
            },
          },
          to: {
            type: 'PHONE',
            phone: {
              number: '@toNumber',
            },
          },
          dialTimeoutDurationSeconds: 30,
          maxCallDurationSeconds: 120,
          events: {
            onAnswer: [
              {
                command: 'messages',
                messages: [
                  {
                    type: 'SAY',
                    say: {
                      text: 'Hello, this is an automated reminder from Sinch. Goodbye.',
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
            onHangup: [
              {
                command: 'hangup',
              },
            ],
          },
        },
      ],
      parameters: [
        { toNumber: '+12017777777' },
        { toNumber: '+12018888888' },
      ],
      batchOptions: {
        maxCps: 5,
        ttlSeconds: 600,
      },
    },
  });
});

Then('the response contains the information about the batch started', () => {
  assert.equal(callResponse.projectId, 'b2c3d4e5-f6a7-4890-b123-c4d5e6f7a890');
  assert.equal(callResponse.serviceId, '0a1b2c3d-4e5f-4678-9abc-d1e2f3a4b5c6');
  assert.equal(callResponse.batchId, '01HZXK9RSQNS9WE4KX0ZG3D5UC');
  assert.equal(callResponse.sessionId, undefined);
});
