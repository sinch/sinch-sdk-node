import { resolveClientParameters } from '@sinch/sdk-client';
import {
  LazyVoiceV2ApiClient,
  Voice,
  VoiceV2SessionsApi,
  VoiceV2SessionsApiFixture,
} from '../../../../src';

describe('VoiceV2SessionsApi', () => {
  let sessionsApi: VoiceV2SessionsApi;
  let fixture: VoiceV2SessionsApiFixture;

  beforeEach(() => {
    fixture = new VoiceV2SessionsApiFixture();
    const lazyClient = new LazyVoiceV2ApiClient(resolveClientParameters({
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    }));
    sessionsApi = new VoiceV2SessionsApi(lazyClient);
  });

  describe('get', () => {
    it('should make a GET request to retrieve a session by ID', async () => {
      // Given
      const requestData: Voice.v2.GetSessionByIdRequestData = {
        sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
      };
      const expectedResponse: Voice.v2.Session = {
        sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        state: 'COMPLETED',
        createTime: new Date('2025-02-10T09:00:00Z'),
        updateTime: new Date('2025-02-10T09:00:47Z'),
        endTime: new Date('2025-02-10T09:00:47Z'),
        calls: [
          {
            callId: '01ARZ3NDEKTSV4RRFFQ69G5FAA',
            projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
            serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
            sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
            direction: 'OUTBOUND',
            originationType: 'SERVER',
            callType: 'PHONE',
            callResult: 'COMPLETED',
            callReason: 'CALLEE_HANGUP',
            startTime: new Date('2025-02-10T09:00:00Z'),
            answerTime: new Date('2025-02-10T09:00:05Z'),
            endTime: new Date('2025-02-10T09:00:47Z'),
            callDurationSeconds: 42,
            from: {
              type: 'PHONE',
              phone: {
                number: '+15551234567',
              },
            },
            to: {
              type: 'PHONE',
              phone: {
                number: '+15559876543',
              },
            },
            callRate: {
              currencyCode: 'USD',
              amount: '0.0123',
            },
            callResourceUrl: 'https://voice.api.sinch.com/v2/projects/5c5bf2b1-35ae-4825-ab89-457e07bb60e6/calls/01ARZ3NDEKTSV4RRFFQ69G5FAA',
          },
        ],
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      sessionsApi.get = fixture.get;
      const response = await sessionsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });
});
