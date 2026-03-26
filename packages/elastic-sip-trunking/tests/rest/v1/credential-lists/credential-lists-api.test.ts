import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CredentialListsApi,
  CredentialListsApiFixture,
  ElasticSipTrunking,
  LazyElasticSipTrunkingApiClient,
} from '../../../../src';

describe('CredentialListsApi', () => {
  let credentialListsApi: CredentialListsApi;
  let fixture: CredentialListsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CredentialListsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyElasticSipTrunkingApiClient(credentials);
    credentialListsApi = new CredentialListsApi(lazyClient);
  });

  describe ('createCredentialList', () => {
    it('should make a POST request to create a new credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.CreateCredentialListRequestData = {
        createCredentialListRequestBody: {
          name: 'My Credential List',
          credentials: [
            {
              username: 'my-username',
              password: 'SecurePassword!234',
            },
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.CredentialList = {
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
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      credentialListsApi.create = fixture.create;
      const response = await credentialListsApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteCredentialList', () => {
    it('should make a DELETE request to delete a credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteCredentialListRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
      };

      // When
      fixture.delete.mockResolvedValue();
      credentialListsApi.delete = fixture.delete;
      const response = await credentialListsApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteCredential', () => {
    it('should make a DELETE request to delete a credential from a credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteCredentialRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        username: 'username',
      };

      // When
      fixture.deleteCredential.mockResolvedValue();
      credentialListsApi.deleteCredential = fixture.deleteCredential;
      const response = await credentialListsApi.deleteCredential(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.deleteCredential).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCredentialListById', () => {
    it('should make a GET request to retrieve a credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetCredentialListRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
      };
      const expectedResponse: ElasticSipTrunking.CredentialList = {
        name: 'My Credential List',
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:10:00Z'),
        credentials: [
          {
            id: '01KKYCEYH8MRJWC4AYVHBQ79J9',
            username: 'username',
          },
        ],
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      credentialListsApi.get = fixture.get;
      const response = await credentialListsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCredentialLists', () => {
    it('should make a GET request to list the credential lists', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListCredentialListsRequestData = {
        page: 1,
        size: 20,
      };
      const mockData:  ElasticSipTrunking.CredentialList[] = [
        {
          id: '01H8Y95DBJT31F104PWFVV9H8C',
          name: 'My Credential List',
          projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
          createTime: new Date('2022-01-01T00:00:00Z'),
          updateTime: new Date('2022-01-01T00:10:00Z'),
          credentials: [
            {
              id: '01KKYCEYH8MRJWC4AYVHBQ79J9',
              username: 'username',
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
      fixture.list.mockResolvedValue(expectedResponse);
      credentialListsApi.list = fixture.list;
      const response = await credentialListsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('trunksByCredentialList', () => {
    it('should make a GET request to list all the trunks that use the specified credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListTrunksForCredentialListRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
      };
      const mockData: ElasticSipTrunking.SipTrunk[] = [
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
      fixture.listTrunks.mockResolvedValue(expectedResponse);
      credentialListsApi.listTrunks = fixture.listTrunks;
      const response = await credentialListsApi.listTrunks(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listTrunks).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCredential', () => {
    it('should make a PUT request to update the password for a credential in a credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateCredentialRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        username: 'username',
        updateCredentialPasswordRequestBody: {
          password: 'SecurePassword!234',
        },
      };
      const expectedResponse: ElasticSipTrunking.Credential = {
        id: '01KKYCEYH8MRJWC4AYVHBQ79J9',
        username: 'username',
      };

      // When
      fixture.updateCredential.mockResolvedValue(expectedResponse);
      credentialListsApi.updateCredential = fixture.updateCredential;
      const response = await credentialListsApi.updateCredential(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.updateCredential).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCredentialList', () => {
    it('should make a PUT request to update a credential list', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateCredentialListRequestData = {
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        updateCredentialListRequestBody: {
          name: 'Updated Credential List Name',
        },
      };
      const expectedResponse: ElasticSipTrunking.CredentialList = {
        name: 'Updated Credential List Name',
        projectId: '1bf62742-7b84-4666-9cbe-8e5734fd57d0',
        id: '01H8Y95DBJT31F104PWFVV9H8B',
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:10:00Z'),
        credentials: [
          {
            id: '01KKYCEYH8MRJWC4AYVHBQ79J9',
            username: 'username',
          },
        ],
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      credentialListsApi.update = fixture.update;
      const response = await credentialListsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
