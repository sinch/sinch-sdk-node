import { VoiceV2BatchesApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { mockserverHosts } from '../../../e2e/hosts';

let batchesApi: VoiceV2BatchesApi;
let startBatchResponse: Voice.v2.BatchResponse;
let batchSummary: Voice.v2.BatchSummary;
let batchDetails: Voice.v2.BatchDetails;
let batchStopResponse: Voice.v2.BatchStopResponse;

Given('the Voice-V2 service "Batches" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  batchesApi = voiceService.v2.batches;
});

When('I send a request to start a batch of calls', async () => {
  startBatchResponse = await batchesApi.start({
    startBatchRequestBody: {
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
  assert.equal(startBatchResponse.projectId, 'b2c3d4e5-f6a7-4890-b123-c4d5e6f7a890');
  assert.equal(startBatchResponse.serviceId, '0a1b2c3d-4e5f-4678-9abc-d1e2f3a4b5c6');
  assert.equal(startBatchResponse.batchId, '01HZXK9RSQNS9WE4KX0ZG3D5UC');
});

When('I send a request to get a batch call summary', async () => {
  batchSummary = await batchesApi.get({
    batchId: '01M144V4N3GSTNVJ3V32TD7H9A',
  });
});

Then('the response contains the batch call summary', () => {
  assert.equal(batchSummary.batchId, '01M144V4N3GSTNVJ3V32TD7H9A');
  assert.equal(batchSummary.sessionCount, 2);
  assert.deepEqual(batchSummary.endTime, new Date('2026-08-28T12:17:49Z'));
  assert.equal(batchSummary.queued, 0);
  assert.equal(batchSummary.inProgress, 0);
  assert.equal(batchSummary.completed, 2);
  assert.equal(batchSummary.expired, 0);
  assert.equal(batchSummary.ttlSeconds, 1800);
  assert.equal(batchSummary.requestedCps, 5);
});

When('I send a request to get batch call details', async () => {
  batchDetails = await batchesApi.getDetails({
    batchId: '01M144V4N3GSTNVJ3V32TD7H9A',
  });
});

Then('the response contains the batch call details', () => {
  assert.equal(batchDetails.sessions.length, 2);
  assert.equal(batchDetails.sessions[0].id, '01M144V4PE5KTSVY2AX19QC332');
  assert.equal(batchDetails.sessions[0].state, 'IN_PROGRESS');
  assert.equal(batchDetails.sessions[1].id, '01M144V4PEH22EHB1SHMJRXBXA');
  assert.equal(batchDetails.sessions[1].state, 'COMPLETED');
});

When('I send a request to stop batch processing', async () => {
  batchStopResponse = await batchesApi.stop({
    batchId: '01M144V4N3GSTNVJ3V32TD7H9A',
  });
});

Then('the response confirms the batch stop request was accepted', () => {
  assert.equal(batchStopResponse.result, 'STOP_REQUESTED');
});
