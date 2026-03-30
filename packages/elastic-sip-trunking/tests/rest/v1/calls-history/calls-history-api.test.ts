import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CallsHistoryApi,
  CallsHistoryApiFixture,
  ElasticSipTrunking,
  LazyElasticSipTrunkingApiClient,
} from '../../../../src';
import { ExportCallRecordsRequestData } from '../../../../src/models';

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
    const lazyClient = new LazyElasticSipTrunkingApiClient(credentials);
    callsApi = new CallsHistoryApi(lazyClient);
  });

  describe ('exportCallRecords', () => {
    it('should make a GET request to export call records for a project', async () => {
      // Given
      const requestData: ExportCallRecordsRequestData = {
        from: '+14408341325',
        to: '+14402801402',
        trunkId: '01JEB7N6VVT8GWX0GZ8M8G1B1D',
        createTime: new Date('2026-03-13T00:00:00Z'),
        callResult: 'COMPLETED',
        direction: 'INBOUND',
        page: 1,
        size: 100,
        fromCountryCode: 'US',
        toCountryCode: 'US',
        emergencyOnly: 'false',
        region: 'us-west',
        projectIds: '1234d567-d3b8-4997-cafe-dada12d47790',
        fileName: 'call_records.csv',
        groupId: 'b654c1ce-ae62-ffff-0357-9e94c43db204',
        parentId: 'parent123',
        relationshipType: 'initial',
        hasChildren: 'false',
      };
      // eslint-disable-next-line max-len
      const data: string = '"Timestamp","Call Id","Answer Time","End Time","From","To","Trunk Id","Trunk Name","Direction","Duration (s)","Result","To Country","From Country","Is Emergency Call","Price Per Minute","Cost","Cause Code","SIP Response Code","Region","MOS","Transport","Port","Project Id","Group Id","Relationship Type","Has Children"\n'
      // eslint-disable-next-line max-len
          + '01AQ3D80ZKSSK35TZFKM3JG9CT,+15551239898,+14155553434,inbound,2021-11-01T23:26:50Z,2021-11-01T23:27:35Z,45,COMPLETED,0.0040,USD,60,0.0040,2021-11-01T23:20:50Z,1bf62742-7b84-4666-9cbe-8e5734fd57d0,dFeDe67-09d5-49d5-b469-e1fc2cb163c7\n'
          + '"2026-03-13T21:08:41.067Z","304356791_91867084@206.127.82.18","","2026-03-13T21:08:44.537Z","+14408341325","+14402801402@3cxtest.pstn.sinch.com:5060","01JEB7N6VVT8GWX0GZ8M8G1B1D","SDK Testing","INBOUND","0","COMPLETED","US","US","false","0.0000 USD","0.0000 USD","1","404","us-west","0.0","udp","5060","1234d567-d3b8-4997-cafe-dada12d47790","b654c1ce-ae62-ffff-0357-9e94c43db204@vp3-jukebox-i-0f4568be22af5f7e6.xmpp.vpc","initial","null"';
      const expectedResponse = {
        fileName: 'call_records.csv',
        data,
      };

      // When
      fixture.export.mockResolvedValue(expectedResponse);
      callsApi.export = fixture.export;
      const response = await callsApi.export(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.export).toHaveBeenCalledWith(requestData);
    });
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
          direction: 'inbound',
          answerTime: new Date('2021-11-01T23:26:50Z'),
          endTime: new Date('2021-11-01T23:27:35Z'),
          durationSeconds: 45,
          callResult: 'COMPLETED',
          pricePerMinute: {
            currencyCode: 'USD',
            amount: 0.0040,
          },
          billingDurationSeconds: 60,
          price: {
            currencyCode: 'USD',
            amount: 0.0040,
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
