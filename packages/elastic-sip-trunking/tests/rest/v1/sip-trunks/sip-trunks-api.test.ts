import { SinchClientParameters } from '@sinch/sdk-client';
import {
  SipTrunksApi,
  SipTrunksApiFixture,
  ElasticSipTrunking,
  LazyElasticSipTrunkingApiClient,
} from '../../../../src';

describe('SIPTrunksApi', () => {
  let sipTrunksApi: SipTrunksApi;
  let fixture: SipTrunksApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new SipTrunksApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyElasticSipTrunkingApiClient(credentials);
    sipTrunksApi = new SipTrunksApi(lazyClient);
  });


  describe ('addAccessControlListToTrunk', () => {
    it('should make a POST request to add an access control list entry to a trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.AddAccessControlListToTrunkRequestData = {
        trunkId: 'trunkId',
        addAccessControlListToTrunkRequestBody: {
          accessControlListIds: [
            '01HA2E80QCBX185VVP21PJG9CT',
            '01H8Y95DBJT31F104PWFVV9H8B',
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.AddAccessControlListToTrunk = {
        accessControlListIds: [
          '01HA2E80QCBX185VVP21PJG9CT',
          '01H8Y95DBJT31F104PWFVV9H8B',
        ],
      };

      // When
      fixture.addAccessControlList.mockResolvedValue(expectedResponse);
      sipTrunksApi.addAccessControlList = fixture.addAccessControlList;
      const response = await sipTrunksApi.addAccessControlList(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.addAccessControlList).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('addCredentialListToTrunk', () => {
    it('should make a POST request to add credential lists to a specified SIP trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.AddCredentialListIdsToTrunkRequestData = {
        trunkId: 'trunkId',
        addCredentialListIdsToTrunkRequestBody: {
          credentialListIds: [
            '01H8Y95DBJT31F104PWFVV9H8B',
            '01HA2E80QCBX185VVP21PJG9CT',
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.CredentialListIds = {
        credentialListIds: [
          '01H8Y95DBJT31F104PWFVV9H8B',
          '01HA2E80QCBX185VVP21PJG9CT',
        ],
      };

      // When
      fixture.addCredentialLists.mockResolvedValue(expectedResponse);
      sipTrunksApi.addCredentialLists = fixture.addCredentialLists;
      const response = await sipTrunksApi.addCredentialLists(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.addCredentialLists).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('createSipTrunk', () => {
    it('should make a POST request to create a new SIP trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.CreateSipTrunkRequestData = {
        createSipTrunkRequestBody: {
          name: 'Acme Trunk',
          hostName: 'acme-domain-1',
        },
      };
      const expectedResponse: ElasticSipTrunking.SipTrunk = {
        id: 'trunkId',
        hostName: 'acme-domain-1',
        topLevelDomain: '.elastic-sip.sinch.com',
        domain: 'acme-domain-1.elastic-sip.sinch.com',
        name: 'Acme Trunk',
        callsPerSecond: 100,
        enableCallerName: true,
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:00:00Z'),
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      sipTrunksApi.create = fixture.create;
      const response = await sipTrunksApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteAccessControlList', () => {
    it('should make a DELETE request to remove an access control list entry from a trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteAccessControlListFromTrunkRequestData = {
        trunkId: 'trunkId',
        accessControlListId: '01HA2E80QCBX185VVP21PJG9CT',
      };

      // When
      fixture.deleteAccessControlList.mockResolvedValue();
      sipTrunksApi.deleteAccessControlList = fixture.deleteAccessControlList;
      const response = await sipTrunksApi.deleteAccessControlList(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.deleteAccessControlList).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteSipTrunk', () => {
    it('should make a DELETE request to delete a SIP trunk by its ID', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteSipTrunkRequestData = {
        sipTrunkId: 'trunkId',
      };

      // When
      fixture.delete.mockResolvedValue();
      sipTrunksApi.delete = fixture.delete;
      const response = await sipTrunksApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('removeCredentialListFromTrunk', () => {
    it('should make a DELETE request to remove a credential list from a SIP trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteCredentialListFromTrunkRequestData = {
        trunkId: 'trunkId',
        credentialListId: '01H8Y95DBJT31F104PWFVV9H8B',
      };

      // When
      fixture.deleteCredentialList.mockResolvedValue();
      sipTrunksApi.deleteCredentialList = fixture.deleteCredentialList;
      const response = await sipTrunksApi.deleteCredentialList(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.deleteCredentialList).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listAccessControlLists', () => {
    it('should make a GET request to list all access control list entries for a trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListAccessControlListsForTrunkRequestData = {
        trunkId: 'trunkId',
      };
      const mockData: string[] = [
        '01HA2E80QCBX185VVP21PJG9CT',
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listAccessControlLists.mockResolvedValue(expectedResponse);
      sipTrunksApi.listAccessControlLists = fixture.listAccessControlLists;
      const response = await sipTrunksApi.listAccessControlLists(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listAccessControlLists).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCredentialListsForTrunk', () => {
    it('should make a GET request to list all the credential lists for a specified SIP trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListCredentialListsForTrunkRequestData = {
        trunkId: 'trunkId',
      };
      const mockData: ElasticSipTrunking.CredentialList[] = [
        {
          name: 'My Credential List',
          projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
          id: '01H8Y95DBJT31F104PWFVV9H8B',
          createTime: new Date('2022-01-01T00:00:00Z'),
          updateTime: null,
          credentials: [
            {
              id: '01KKYCEYH8MRJWC4AYVHBQ79J9',
              username: 'my-username',
            },
          ],
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listCredentialLists.mockResolvedValue(expectedResponse);
      sipTrunksApi.listCredentialLists = fixture.listCredentialLists;
      const response = await sipTrunksApi.listCredentialLists(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listCredentialLists).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getSipTrunkById', () => {
    it('should make a GET request to search for a SIP trunk by ID', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetSipTrunkRequestData = {
        sipTrunkId: 'trunkId',
      };
      const expectedResponse: ElasticSipTrunking.SipTrunk = {
        id: 'trunkId',
        hostName: 'acme-domain-1',
        topLevelDomain: '.elastic-sip.sinch.com',
        domain: 'acme-domain-1.elastic-sip.sinch.com',
        name: 'Acme Trunk',
        callsPerSecond: 100,
        enableCallerName: true,
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:00:00Z'),
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      sipTrunksApi.get = fixture.get;
      const response = await sipTrunksApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getSipTrunks', () => {
    it('should make a GET request to list all SIP trunks', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListSipTrunksRequestData = {
        domain: 'acme-domain-1.elastic-sip.sinch.com',
      };
      const mockData: ElasticSipTrunking.SipTrunk[] =[
        {
          id: 'trunkId',
          hostName: 'acme-domain-1',
          topLevelDomain: '.elastic-sip.sinch.com',
          domain: 'acme-domain-1.elastic-sip.sinch.com',
          name: 'Acme Trunk',
          callsPerSecond: 100,
          enableCallerName: true,
          createTime: new Date('2022-01-01T00:00:00Z'),
          updateTime: new Date('2022-01-01T00:00:00Z'),
          projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
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
      sipTrunksApi.list = fixture.list;
      const response = await sipTrunksApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateSipTrunk', () => {
    it('should make a PUT request to update an existing SIP Trunk by ID', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateSipTrunkRequestData = {
        sipTrunkId: 'trunkId',
        updateSipTrunkRequestBody: {
          name: 'Acme Trunk Updated',
          hostName: 'acme-domain-updated-1',
        },
      };
      const expectedResponse: ElasticSipTrunking.SipTrunk = {
        id: 'trunkId',
        hostName: 'acme-domain-updated-1',
        topLevelDomain: '.elastic-sip.sinch.com',
        domain: 'acme-domain-updated-1.elastic-sip.sinch.com',
        name: 'Acme Trunk Updated',
        callsPerSecond: 100,
        enableCallerName: true,
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:00:00Z'),
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      sipTrunksApi.update = fixture.update;
      const response = await sipTrunksApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('bulkUpdateCredentialListsForTrunk', () => {
    it('should make a PUT request to update the list of credential list entries for a trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateCredentialListIdsForTrunkRequestData = {
        trunkId: 'trunkId',
        updateCredentialListIdsForTrunkRequestBody: {
          credentialListIds: [
            '01H8Y95DBJT31F104PWFVV9H8B',
            '01HA2E80QCBX185VVP21PJG9CT',
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.CredentialListIds = {
        credentialListIds: [
          '01H8Y95DBJT31F104PWFVV9H8B',
          '01HA2E80QCBX185VVP21PJG9CT',
        ],
      };

      // When
      fixture.updateCredentialLists.mockResolvedValue(expectedResponse);
      sipTrunksApi.updateCredentialLists = fixture.updateCredentialLists;
      const response = await sipTrunksApi.updateCredentialLists(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.updateCredentialLists).toHaveBeenCalledWith(requestData);
    });
  });
});
