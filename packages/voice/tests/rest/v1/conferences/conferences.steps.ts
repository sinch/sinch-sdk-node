import { ConferencesApi, VoiceService, Voice  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let conferencesApi: ConferencesApi;
let conferenceCallResponse: Voice.CalloutResponse;
let conferenceInformation: Voice.GetConferenceInfoResponse;
let manageParticipantResponse: void;
let kickParticipantResponse: void;
let kickAllParticipantsResponse: void;

Given('the Voice service "Conferences" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    voiceHostname: 'http://localhost:3019',
  });
  conferencesApi = voiceService.conferences;
});

When('I send a request to make a Conference call with the "Conferences" service', async () => {
  conferenceCallResponse = await conferencesApi.call({
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

Then('the callout response from the "Conferences" service contains the Conference call ID', () => {
  assert.equal(conferenceCallResponse.callId, '1ce0ffee-ca11-ca11-ca11-abcdef000002');
});

When('I send a request to get the conference information', async () => {
  conferenceInformation = await conferencesApi.get({
    conferenceId: 'myConferenceId-E2E',
  });
});

Then('the response contains the information about the conference participants', () => {
  assert.ok(conferenceInformation.participants);
  const participant1 = conferenceInformation.participants[0];
  assert.equal(participant1.id, '1ce0ffee-ca11-ca11-ca11-abcdef000012');
  assert.equal(participant1.cli, '+12015555555');
  assert.equal(participant1.duration, 35);
  assert.equal(participant1.muted, true);
  assert.equal(participant1.onhold, true);
  const participant2 = conferenceInformation.participants[1];
  assert.equal(participant2.id, '1ce0ffee-ca11-ca11-ca11-abcdef000022');
  assert.equal(participant2.cli, '+12015555555');
  assert.equal(participant2.duration, 6);
  assert.equal(participant2.muted, false);
  assert.equal(participant2.onhold, false);
});

When('I send a request to put a participant on hold', async () => {
  manageParticipantResponse = await conferencesApi.manageParticipant({
    conferenceId: 'myConferenceId-E2E',
    callId: '1ce0ffee-ca11-ca11-ca11-abcdef000012',
    manageParticipantRequestBody: {
      command: 'onhold',
      moh: 'music2',
    },
  });
});

Then('the manage participant response contains no data', () => {
  assert.deepEqual(manageParticipantResponse, {});
});

When('I send a request to kick a participant from a conference', async () => {
  kickParticipantResponse = await conferencesApi.kickParticipant({
    conferenceId: 'myConferenceId-E2E',
    callId: '1ce0ffee-ca11-ca11-ca11-abcdef000012',
  });
});

Then('the kick participant response contains no data', () => {
  assert.deepEqual(kickParticipantResponse, {});
});

When('I send a request to kick all the participants from a conference', async () => {
  kickAllParticipantsResponse = await conferencesApi.kickAll({
    conferenceId: 'myConferenceId-E2E',
  });
});

Then('the kick all participants response contains no data', () => {
  assert.deepEqual(kickAllParticipantsResponse, {});
});
