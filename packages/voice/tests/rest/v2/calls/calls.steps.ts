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
});
