import { VoiceV2BatchesApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { mockserverHosts } from '../../../e2e/hosts';

let batchesApi: VoiceV2BatchesApi;
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
