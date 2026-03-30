import { SinchClientParameters } from '@sinch/sdk-client';
import { ElasticSipTrunking, LazyElasticSipTrunkingApiClient } from '../../../../src';
import { CallBlockingRulesApi, CallBlockingRulesApiFixture } from '../../../../src';

describe('CallBlockingRulesApi', () => {
  let callBlockingRulesApi: CallBlockingRulesApi;
  let fixture: CallBlockingRulesApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CallBlockingRulesApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyElasticSipTrunkingApiClient(credentials);
    callBlockingRulesApi = new CallBlockingRulesApi(lazyClient);
  });


  describe ('createBlockingRule', () => {
    it('should make a POST request to create a new call blocking rule', async () => {
      // Given
      const requestData: ElasticSipTrunking.CreateBlockingRuleRequestData = {
        createCallBlockingRuleRequestBody: {
          direction: 'INBOUND',
          name: 'Block inbound calls',
          callerCountry: 'US',
          callerMatch: '123',
        },
      };
      const expectedResponse: ElasticSipTrunking.CallBlockingRule = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        direction: 'INBOUND',
        name: 'Block inbound calls',
        callerCountry: 'US',
        callerMatch: '123',
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: null,
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      callBlockingRulesApi.create = fixture.create;
      const response = await callBlockingRulesApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteBlockingRuleById', () => {
    it('should make a DELETE request to delete a call blocking rule', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteBlockingRuleRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
      };

      // When
      fixture.delete.mockResolvedValue();
      callBlockingRulesApi.delete = fixture.delete;
      const response = await callBlockingRulesApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getBlockingRules', () => {
    it('should make a GET request to list the call blocking rules', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListBlockingRulesRequestData = {
        page: 1,
        size: 20,
        sort: ['calleeCountry,(ascending)'],
      };
      const mockData:  ElasticSipTrunking.CallBlockingRule[] = [
        {
          id: '01H8Y95DBJT31F104PWFVV9H8C',
          direction: 'OUTBOUND',
          name: 'Block outbound calls',
          calleeCountry: 'US',
          calleeMatch: '123',
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
      callBlockingRulesApi.list = fixture.list;
      const response = await callBlockingRulesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateBlockingRuleById', () => {
    it('should make a PUT request to update a call blocking rule', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateBlockingRuleRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        updateCallBlockingRuleRequestBody: {
          direction: 'INBOUND',
          name: 'Updated rule name',
          callerMatch: '456',
        },
      };
      const expectedResponse: ElasticSipTrunking.CallBlockingRule = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        direction: 'INBOUND',
        name: 'Updated rule name',
        callerCountry: 'US',
        callerMatch: '456',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      callBlockingRulesApi.update = fixture.update;
      const response = await callBlockingRulesApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
