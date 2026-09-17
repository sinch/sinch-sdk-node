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
  });

  describe('list', () => {
    it('should make a GET request to list calls', async () => {
      // Given
      const requestData: Voice.v2.ListCallsRequestData = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        from: '+15551234567',
        to: '+15551234568',
        callType: 'PHONE',
        startTime: new Date('2025-02-01T14:00:00Z'),
        endTime: new Date('2025-03-01T14:00:00Z'),
        callResult: 'COMPLETED',
        callReason: 'CALLEE_HANGUP',
        pageSize: 20,
        page: 1,
      };
      const mockData: Voice.v2.Call[] = [
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
              number: '+15551234568',
            },
          },
          callRate: {
            currencyCode: 'USD',
            amount: '0.0123',
          },
          callResourceUrl: 'https://voice.api.sinch.com/v2/projects/5c5bf2b1-35ae-4825-ab89-457e07bb60e6/calls/01ARZ3NDEKTSV4RRFFQ69G5FAA',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      callsApi.list = fixture.list;
      const response = await callsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe('get', () => {
    it('should make a GET request to retrieve call details by call ID', async () => {
      // Given
      const requestData: Voice.v2.GetCallByIdRequestData = {
        callId: '01ARZ3NDEKTSV4RRFFQ69G5FAA',
      };
      const expectedResponse: Voice.v2.Call = {
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
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      callsApi.get = fixture.get;
      const response = await callsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe('interactByCallId', () => {
    it('should make a PATCH request to interact with an ongoing call by call ID', async () => {
      // Given
      const requestData: Voice.v2.PatchCallByIdRequestData = {
        callId: '01ARZ3NDEKTSV4RRFFQ69G5FAA',
        'Idempotency-Key': '01ARZ3NDEKTSV4RRFFQ69G5FAB',
        callPatchRequestBody: {
          commands: [
            {
              command: 'hangup',
            },
          ],
        },
      };

      // When
      fixture.interactByCallId.mockResolvedValue();
      callsApi.interactByCallId = fixture.interactByCallId;
      const response = await callsApi.interactByCallId(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.interactByCallId).toHaveBeenCalledWith(requestData);
    });
  });

  describe('interactByCallName', () => {
    it('should make a PATCH request to interact with an ongoing call by session ID and call name', async () => {
      // Given
      const requestData: Voice.v2.PatchCallBySessionAndNameRequestData = {
        sessionId: '01BX5ZZKBKACTAV9WEVGEMMVRB',
        callName: 'origin',
        'Idempotency-Key': '01ARZ3NDEKTSV4RRFFQ69G5FAC',
        callPatchRequestBody: {
          commands: [
            {
              command: 'hangup',
            },
          ],
        },
      };

      // When
      fixture.interactByCallName.mockResolvedValue();
      callsApi.interactByCallName = fixture.interactByCallName;
      const response = await callsApi.interactByCallName(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.interactByCallName).toHaveBeenCalledWith(requestData);
    });
  });
});
