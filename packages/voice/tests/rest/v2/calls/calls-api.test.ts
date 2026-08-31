import { resolveClientParameters } from '@sinch/sdk-client';
import {
  LazyVoiceV2ApiClient,
  Voice,
  VoiceV2CallsApi,
  VoiceV2CallsApiFixture,
} from '../../../../src';

describe('VoiceV2CallsApi', () => {
  let callsApi: VoiceV2CallsApi;
  let fixture: VoiceV2CallsApiFixture;

  beforeEach(() => {
    fixture = new VoiceV2CallsApiFixture();
    const lazyClient = new LazyVoiceV2ApiClient(resolveClientParameters({
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    }));
    callsApi = new VoiceV2CallsApi(lazyClient);
  });

  describe('start', () => {
    it('should make a POST request to start an outbound voice call', async () => {
      // Given
      const requestData: Voice.v2.CreateCallRequestData = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        'Idempotency-Key': '01ARZ3NDEKTSV4RRFFQ69G5FAA',
        createCallRequestBody: {
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
                  number: '+15559876543',
                },
              },
              dialTimeoutDurationSeconds: 30,
              maxCallDurationSeconds: 3600,
              events: {
                onAnswer: [
                  {
                    command: 'messages',
                    messages: [
                      {
                        type: 'SAY',
                        say: {
                          text: 'Hello, your call is now connected.',
                          voiceName: 'Emma',
                        },
                      },
                    ],
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
        },
      };
      const expectedResponse: Voice.v2.CallResponse = {
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
      };

      // When
      fixture.start.mockResolvedValue(expectedResponse);
      callsApi.start = fixture.start;
      const response = await callsApi.start(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.start).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to start a batch of outbound voice calls', async () => {
      // Given
      const requestData: Voice.v2.CreateCallRequestData = {
        createCallRequestBody: {
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
      const expectedResponse: Voice.v2.CallResponse = {
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
        batchId: '01BX5ZZKBKACTAV9WEVGEMMVRC',
      };

      // When
      fixture.start.mockResolvedValue(expectedResponse);
      callsApi.start = fixture.start;
      const response = await callsApi.start(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.start).toHaveBeenCalledWith(requestData);
    });
  });
});
