import { SinchClientParameters } from '@sinch/sdk-client';
import { SipEndpointsApi, SipEndpointsApiFixture, ElasticSipTrunking } from '../../../../src';
import { SipEndpoint } from '../../../../src/models';

describe('SIPEndpointsApi', () => {
  let sipEndpointsApi: SipEndpointsApi;
  let fixture: SipEndpointsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new SipEndpointsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    sipEndpointsApi = new SipEndpointsApi(credentials);
  });


  describe ('createSipEndpoint', () => {
    it('should make a POST request to create a new SIP Endpoint', async () => {
      // Given
      const requestData: ElasticSipTrunking.CreateSipEndpointRequestData = {
        sipTrunkId: 'sipTrunkId',
        createSipEndpointRequestBody: {
          name: 'Acme Endpoint',
          address: '127.0.0.1',
          priority: 1,
        },
      };
      const expectedResponse: SipEndpoint = {
        id: 'sipEndpointId',
        name: 'Acme Endpoint',
        address: '127.0.0.1',
        priority: 1,
        port: 5060,
        transport: 'UDP',
        enabled: true,
        sipTrunkId: 'sipTrunkId',
        createTime: new Date('2022-01-01T00:00:00Z'),
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      sipEndpointsApi.create = fixture.create;
      const response = await sipEndpointsApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteSipEndpoint', () => {
    it('should make a DELETE request to delete a SIP Endpoint', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteSipEndpointRequestData = {
        sipTrunkId: 'sipTrunkId',
        sipEndpointId: 'sipEndpointId',
      };

      // When
      fixture.delete.mockResolvedValue();
      sipEndpointsApi.delete = fixture.delete;
      const response = await sipEndpointsApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getSipEndpoint', () => {
    it('should make a GET request to fetch the list of all SIP Endpoints', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListSipEndpointsRequestData = {
        sipTrunkId: 'sipTrunkId',
      };
      const mockData: ElasticSipTrunking.SipEndpoint[] = [
        {
          id: 'sipEndpointId',
          name: 'Acme Endpoint',
          address: '127.0.0.1',
          priority: 1,
          port: 5060,
          transport: 'UDP',
          enabled: true,
          sipTrunkId: 'sipTrunkId',
          createTime: new Date('2022-01-01T00:00:00Z'),
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
      sipEndpointsApi.list = fixture.list;
      const response = await sipEndpointsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getSipEndpointById', () => {
    it('should make a GET request to get a SIP endpoint by specifying its ID', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetSipEndpointByIdRequestData = {
        sipTrunkId: 'sipTrunkId',
        sipEndpointId: 'sipEndpointId',
      };
      const expectedResponse: ElasticSipTrunking.SipEndpoint = {
        id: 'sipEndpointId',
        name: 'Acme Endpoint',
        address: '127.0.0.1',
        priority: 1,
        port: 5060,
        transport: 'UDP',
        enabled: true,
        sipTrunkId: 'sipTrunkId',
        createTime: new Date('2022-01-01T00:00:00Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      sipEndpointsApi.get = fixture.get;
      const response = await sipEndpointsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateSipEndpoint', () => {
    it('should make a PUT request to update an existing SIP endpoint', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateSipEndpointRequestData = {
        sipTrunkId: 'sipTrunkId',
        sipEndpointId: 'sipEndpointId',
        updateSipEndpointRequestBody: {
          name: 'Acme Endpoint Updated',
          address: '127.0.0.1',
          priority: 1,
        },
      };
      const expectedResponse: ElasticSipTrunking.SipEndpoint = {
        id: 'sipEndpointId',
        name: 'Acme Endpoint Updated',
        address: '127.0.0.1',
        priority: 1,
        port: 5060,
        transport: 'UDP',
        enabled: true,
        sipTrunkId: 'sipTrunkId',
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:01:00Z'),
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      sipEndpointsApi.update = fixture.update;
      const response = await sipEndpointsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
