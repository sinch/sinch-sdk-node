import { resolveClientParameters } from '@sinch/sdk-client';
import {
  LazyVoiceV2ApiClient,
  Voice,
  VoiceV2BatchesApi,
  VoiceV2BatchesApiFixture,
} from '../../../../src';

describe('VoiceV2BatchesApi', () => {
  let batchesApi: VoiceV2BatchesApi;
  let fixture: VoiceV2BatchesApiFixture;

  beforeEach(() => {
    fixture = new VoiceV2BatchesApiFixture();
    const lazyClient = new LazyVoiceV2ApiClient(resolveClientParameters({
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    }));
    batchesApi = new VoiceV2BatchesApi(lazyClient);
  });

  describe('start', () => {
    it('should make a POST request to start a batch of outbound voice calls', async () => {
      // Given
      const requestData: Voice.v2.StartBatchRequestData = {
        startBatchRequestBody: {
          commands: [
            {
              command: 'dial',
              callName: 'origin',
              from: {
                type: 'PHONE',
                phone: {
                  number: '+15551234567',
                },
              },
              to: {
                type: 'PHONE',
                phone: {
                  number: '@numberB',
                },
              },
            },
          ],
          parameters: [
            { numberB: '+15559876543' },
            { numberB: '+15559876544' },
          ],
          batchOptions: {
            maxCps: 10,
            ttlSeconds: 3600,
          },
        },
      };
      const expectedResponse: Voice.v2.BatchResponse = {
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
      };

      // When
      fixture.start.mockResolvedValue(expectedResponse);
      batchesApi.start = fixture.start;
      const response = await batchesApi.start(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.start).toHaveBeenCalledWith(requestData);
    });
  });

  describe('get', () => {
    it('should make a GET request to retrieve a batch summary', async () => {
      // Given
      const requestData: Voice.v2.GetBatchCallSummaryRequestData = {
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
      };
      const expectedResponse: Voice.v2.BatchSummary = {
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
        sessionCount: 3,
        queued: 1,
        inProgress: 1,
        completed: 1,
        expired: 0,
        requestedCps: 10,
        ttlSeconds: 3600,
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      batchesApi.get = fixture.get;
      const response = await batchesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe('getDetails', () => {
    it('should make a GET request to retrieve batch details', async () => {
      // Given
      const requestData: Voice.v2.GetBatchDetailsRequestData = {
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
      };
      const expectedResponse: Voice.v2.BatchDetails = {
        sessions: [
          { id: '01F8Z5J4X2G9Y3J4X2G9Y3J4X2G9', state: 'COMPLETED' },
          { id: '01F8Z5J4X2G9Y3J4X2G9Y3J4X5YJ', state: 'IN_PROGRESS' },
          { id: '01F8Z5J4X2G9Y3J4X2G9Y3J4X9QK', state: 'QUEUED' },
        ],
      };

      // When
      fixture.getDetails.mockResolvedValue(expectedResponse);
      batchesApi.getDetails = fixture.getDetails;
      const response = await batchesApi.getDetails(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getDetails).toHaveBeenCalledWith(requestData);
    });
  });

  describe('stop', () => {
    it('should make a DELETE request to stop processing a batch', async () => {
      // Given
      const requestData: Voice.v2.StopBatchProcessingRequestData = {
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
      };
      const expectedResponse: void = undefined;

      // When
      fixture.stop.mockResolvedValue(expectedResponse);
      batchesApi.stop = fixture.stop;
      const response = await batchesApi.stop(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.stop).toHaveBeenCalledWith(requestData);
    });
  });
});
