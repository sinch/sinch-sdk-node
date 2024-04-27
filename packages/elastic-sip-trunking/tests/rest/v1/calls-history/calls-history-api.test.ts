import { SinchClientParameters } from '@sinch/sdk-client';
import { CallsHistoryApi, CallsHistoryApiFixture, ElasticSipTrunking } from '../../../../src';

describe('CallsApi', () => {
  let callsApi: CallsHistoryApi;
  let fixture: CallsHistoryApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CallsHistoryApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    callsApi = new CallsHistoryApi(credentials);
  });


  describe ('findCalls', () => {
    it('should make a GET request to find calls by query parameters', async () => {
      // Given
      const requestData: ElasticSipTrunking.FindCallsRequestData = {
        trunkId: 'dFeDe67-09d5-49d5-b469-e1fc2cb163c7',
      };
      const mockData: ElasticSipTrunking.Call[] = [
        {
          callId: '01AQ3D80ZKSSK35TZFKM3JG9CT',
          to: '+15551239898',
          from: '+14155553434',
          direction: 'INBOUND',
          answerTime: new Date('2021-11-01T23:26:50Z'),
          endTime: new Date('2021-11-01T23:27:35Z'),
          durationSeconds: 45,
          callResult: 'COMPLETED',
          pricePerMinute: {
            currencyCode: 'USD',
            amount: '0.0040',
          },
          billingDurationSeconds: 60,
          price: {
            currencyCode: 'USD',
            amount: '0.0040',
          },
          createTime: new Date('2021-11-01T23:20:50Z'),
          projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
          trunkId: 'dFeDe67-09d5-49d5-b469-e1fc2cb163c7',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.find.mockResolvedValue(expectedResponse);
      callsApi.find = fixture.find;
      const response = await callsApi.find(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.find).toHaveBeenCalledWith(requestData);
    });
  });
});
