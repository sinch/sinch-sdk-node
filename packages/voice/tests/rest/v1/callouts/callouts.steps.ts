import { CalloutsApi, VoiceService, Voice  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let calloutsApi: CalloutsApi;
let ttsCallResponse: Voice.CalloutResponse;

Given('the Voice service "Callouts" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    voiceHostname: 'http://localhost:3019',
  });
  calloutsApi = voiceService.callouts;
});

When('I send a request to make a TTS call', async () => {
  ttsCallResponse = await calloutsApi.tts({
    ttsCalloutRequestBody: {
      method: 'ttsCallout',
      ttsCallout: {
        cli: '+12015555555',
        destination: {
          type: 'number',
          endpoint: '+12017777777',
        },
        locale: 'en-US',
        text: 'Hello, this is a call from Sinch.',
      },
    },
  });
});

Then('the callout response contains the TTS call ID', () => {
  assert.equal(ttsCallResponse.callId, '1ce0ffee-ca11-ca11-ca11-abcdef000001');
});

When('I send a request to make a Conference call with the "Callout" service', async () => {
  ttsCallResponse = await calloutsApi.conference({
    conferenceCalloutRequestBody: {
      method: 'conferenceCallout',
      conferenceCallout: {
        cli: '+12015555555',
        destination: {
          type: 'number',
          endpoint: '+12017777777',
        },
        conferenceId: 'myConferenceId-E2E',
        locale: 'en-US',
        greeting: 'Welcome to this conference call.',
        mohClass: 'music1',
      },
    },
  });
});

Then('the callout response contains the Conference call ID', () => {
  assert.equal(ttsCallResponse.callId, '1ce0ffee-ca11-ca11-ca11-abcdef000002');
});

When('I send a request to make a Custom call', async () => {
  ttsCallResponse = await calloutsApi.custom({
    customCalloutRequestBody: {
      method: 'customCallout',
      customCallout: {
        cli: '+12015555555',
        destination: {
          type: 'number',
          endpoint: '+12017777777',
        },
        custom: 'Custom text',
        ice: Voice.customCalloutHelper.formatIceResponse(
          Voice.iceActionHelper.connectPstn({
            number: '+12017777777',
            cli: '+12015555555',
          }),
          Voice.iceInstructionHelper.say('Welcome to Sinch.', 'en-US/male'),
          Voice.iceInstructionHelper.startRecording({
            destinationUrl: 'To specify',
            credentials: 'To specify',
          }),
        ),
        ace: Voice.customCalloutHelper.formatAceResponse(
          Voice.aceActionHelper.runMenu({
            locale: 'Kimberly',
            enableVoice: true,
            barge: true,
            menus: [
              {
                id: 'main',
                mainPrompt: '#tts[Welcome to the main menu. Press 1 to confirm order or 2 to cancel]',
                repeatPrompt: '#tts[We didn\'t get your input, please try again]',
                timeoutMills: 5000,
                options: [
                  {
                    dtmf: '1',
                    action: 'menu(confirm)',
                  },
                  {
                    dtmf: '2',
                    action: 'return(cancel)',
                  },
                ],
              },
              {
                id: 'confirm',
                mainPrompt: '#tts[Thank you for confirming your order. Enter your 4-digit PIN.]',
                maxDigits: 4,
              },
            ],
          }),
        ),
        pie: 'https://callback-server.com/voice',
      },
    },
  });
});

Then('the callout response contains the Custom call ID', () => {
  assert.equal(ttsCallResponse.callId, '1ce0ffee-ca11-ca11-ca11-abcdef000003');
});
