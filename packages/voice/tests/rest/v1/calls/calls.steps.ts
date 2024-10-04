import { CallsApi, VoiceService, Voice  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let callsApi: CallsApi;
let callInformation: Voice.GetCallInformation;
let updateCallResponse: void;
let error: any;
let manageWithCallLegResponse: void;

Given('the Voice service "Calls" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    voiceHostname: 'http://localhost:3019',
  });
  callsApi = voiceService.calls;
});

When('I send a request to get a call\'s information', async () => {
  callInformation = await callsApi.get({
    callId: '1ce0ffee-ca11-ca11-ca11-abcdef000003',
  });
});

Then('the response contains the information about the call', () => {
  assert.equal(callInformation.callId, '1ce0ffee-ca11-ca11-ca11-abcdef000003');
  const participant: Voice.Participant = {
    type: 'Number',
    endpoint: '+12017777777',
  };
  assert.deepEqual(callInformation.to, participant);
  assert.equal(callInformation.domain, 'pstn');
  assert.equal(callInformation.duration, 14);
  assert.equal(callInformation.status, 'FINAL');
  const result: Voice.ResultEnum = 'ANSWERED';
  assert.equal(callInformation.result, result);
  const reason: Voice.ReasonEnum = 'MANAGERHANGUP';
  assert.equal(callInformation.reason, reason);
  assert.deepEqual(callInformation.timestamp, new Date('2024-06-06T17:36:00Z'));
  assert.equal(callInformation.custom, 'Custom text');
  const userRate: Voice.VoicePrice = {
    currencyId: 'EUR',
    amount: 0.1758,
  };
  assert.deepEqual(callInformation.userRate, userRate);
  const debit: Voice.VoicePrice = {
    currencyId: 'EUR',
    amount: 0.1758,
  };
  assert.deepEqual(callInformation.debit, debit);
});

When('I send a request to update a call', async () => {
  updateCallResponse = await callsApi.update({
    callId: '1ce0ffee-ca11-ca11-ca11-abcdef000022',
    updateCallRequestBody: {
      instructions: [
        Voice.svamlInstructionHelper.buildSay(
          'Sorry, the conference has been cancelled. The call will end now.',
          'en-US',
        ),
      ],
      action: Voice.svamlActionHelper.buildHangup(),
    },
  });
});

Then('the update call response contains no data', () => {
  assert.deepEqual(updateCallResponse, {});
});

When('I send a request to update a call that doesn\'t exist', async () => {
  updateCallResponse = undefined;
  try {
    updateCallResponse = await callsApi.update({
      callId: 'not-existing-callId',
      updateCallRequestBody: {
        instructions: [
          Voice.svamlInstructionHelper.buildSay(
            'Sorry, the conference has been cancelled. The call will end now.',
            'en-US',
          ),
        ],
        action: Voice.svamlActionHelper.buildHangup(),
      },
    });
  } catch (e) {
    error = e;
  }
});

Then('the update call response contains a "not found" error', () => {
  assert.equal(updateCallResponse, undefined);
  const voiceError = JSON.parse(error.data) as Voice.VoiceError;
  assert.equal(voiceError.errorCode, 40400);
  assert.equal(voiceError.message, 'Call not found');
  assert.equal(voiceError.reference, '38188074-abcd-56ab-ab64-daf82fada8e8');
});

When('I send a request to manage a call with callLeg', async () => {
  manageWithCallLegResponse = await callsApi.manageWithCallLeg({
    callId: '1ce0ffee-ca11-ca11-ca11-abcdef000032',
    callLeg: 'callee',
    manageWithCallLegRequestBody: {
      instructions: [
        Voice.svamlInstructionHelper.buildPlayFiles(
          ['https://samples-files.com/samples/Audio/mp3/sample-file-4.mp3'],
        ),
      ],
      action: Voice.svamlActionHelper.buildContinue(),
    },
  });
});

Then('the manage a call with callLeg response contains no data', () => {
  assert.deepEqual(manageWithCallLegResponse, {});
});
