import { VoiceV2SvamlApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { mockserverHosts } from '../../../e2e/hosts';

let svamlApi: VoiceV2SvamlApi;
let describeResponse: Voice.v2.SvamlDescriptionResponse;
let validateResponse: Voice.v2.ValidateSvamlResponse;

const sampleSvaml: Voice.v2.SvamlInput = {
  commands: [
    {
      command: 'dial',
      callName: 'audio-notification',
      from: { type: 'PHONE', phone: { number: '+12015555555' } },
      to: { type: 'PHONE', phone: { number: '+12017777777' } },
      dialTimeoutDurationSeconds: 30,
      maxCallDurationSeconds: 300,
      events: {
        onAnswer: [
          {
            command: 'messages',
            messagesName: 'notification',
            messages: [
              { type: 'PLAY', play: { url: 'https://samplelib.com/mp3/sample-12s.mp3' } },
              {
                type: 'SAY',
                say: {
                  text: 'Hello! This is a test notification from Sinch. Your verification code is 4 8 3 7.',
                  voiceName: 'Emma',
                },
              },
            ],
            events: { onFinish: [{ command: 'hangup' }] },
          },
        ],
      },
    },
  ],
};

Given('the Voice-V2 service "Svaml" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  svamlApi = voiceService.v2.svaml;
});

When('I send a request to validate a SVAML payload', async () => {
  validateResponse = await svamlApi.validate({
    validateSvamlRequestBody: {
      svaml: sampleSvaml,
    },
  });
});

Then('the response confirms the SVAML payload is valid', () => {
  assert.equal(validateResponse.isValid, true);
  assert.equal(validateResponse.errors, undefined);
});

When('I send a request to describe a SVAML payload', async () => {
  describeResponse = await svamlApi.describe({
    describeSvamlRequestBody: {
      svaml: sampleSvaml,
    },
  });
});

Then('the response contains the description of the SVAML payload', () => {
  const expectedDescription
    = '1. A new call with name \'audio-notification\' will be initiated to number +12017777777'
    + ' with max duration set to 5 minutes.\n'
    + ' * on answer:\n'
    + '     1. An audio file will be played from https://samplelib.com/mp3/sample-12s.mp3.\n'
    + '     1. A TTS message will be played using the voice Emma.\n'
    + '      * on finish:\n'
    + '          1. The call will be disconnected';
  assert.equal(describeResponse.description, expectedDescription);
});
