import { SinchClientParameters } from '@sinch/sdk-client';
import {
  AccessControlListApi,
  AccessControlListApiFixture,
  ElasticSipTrunking,
} from '../../../../src';

describe('AccessControlListApi', () => {
  let accessControlListApi: AccessControlListApi;
  let fixture: AccessControlListApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new AccessControlListApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    accessControlListApi = new AccessControlListApi(credentials);
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
      fixture.addToTrunk.mockResolvedValue(expectedResponse);
      accessControlListApi.addToTrunk = fixture.addToTrunk;
      const response = await accessControlListApi.addToTrunk(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.addToTrunk).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('addIpRangeToAccessControlList', () => {
    it('should make a POST request to add an IP range to an access control list entry', async () => {
      // Given
      const requestData: ElasticSipTrunking.AddIpRangeToAccessControlListRequestData = {
        accessControlListId: '01H8Y95DBJT31F104PWFVV9H8B',
        addIpRangeRequestBody: {
          description: 'IP range name',
          ipAddress: '11.12.13.14',
          range: 27,
        },
      };
      const expectedResponse: ElasticSipTrunking.IpRange = {
        description: 'IP range name',
        ipAddress: '11.12.13.14',
        range: 27,
        projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
        accessControlListId: '01H8Y95DBJT31F104PWFVV9H8B',
        id: '01HA9BYAH3J5TFDGK62991YYWC',
        createTime: new Date('2023-09-14T08:11:56.324855024'),
      };

      // When
      fixture.addIpRange.mockResolvedValue(expectedResponse);
      accessControlListApi.addIpRange = fixture.addIpRange;
      const response = await accessControlListApi.addIpRange(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.addIpRange).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('createAccessControlList', () => {
    // eslint-disable-next-line max-len
    it('should make a POST request to create an access control list entry with at least one IP address or IP range', async () => {
      // Given
      const requestData: ElasticSipTrunking.CreateAccessControlListRequestData = {
        createAccessControlListBody: {
          name: 'My new ACL',
          enabled: true,
          ipRanges: [
            {
              description: 'Location 1',
              ipAddress: '15.15.15.15',
              range: 20,
            },
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.AccessControlList = {
        name: 'My new ACL',
        projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
        enabled: true,
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
        createTime: new Date('2023-09-14T07:39:19.703Z'),
        updateTime: null,
        ipRanges: [
          {
            description: 'Location 1',
            ipAddress: '15.15.15.15',
            range: 20,
            projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
            accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
            id: '01HA9BRJYR9Q7ZBDYMXHVWT8S8',
            createTime: new Date('2023-09-14T07:39:19.772Z'),
            updateTime: null,
          },
        ],
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      accessControlListApi.create = fixture.create;
      const response = await accessControlListApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getAccessControlListById', () => {
    // eslint-disable-next-line max-len
    it('should make a GET request to retrieve an access control list', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetAccessControlListRequestData = {
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
      };
      const expectedResponse: ElasticSipTrunking.AccessControlList = {
        name: 'My new ACL',
        projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
        enabled: true,
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
        createTime: new Date('2023-09-14T07:39:19Z'),
        updateTime: null,
        ipRanges: [
          {
            description: 'Location 1',
            ipAddress: '15.15.15.15',
            range: 20,
            projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
            accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
            id: '01HA9BRJYR9Q7ZBDYMXHVWT8S8',
            createTime: new Date('2023-09-14T07:39:19Z'),
            updateTime: null,
          },
        ],
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      accessControlListApi.get = fixture.get;
      const response = await accessControlListApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteAccessControlList', () => {
    it('should make a DELETE request to delete an access control list entry', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteAccessControlListRequestData = {
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
      };

      // When
      fixture.delete.mockResolvedValue();
      accessControlListApi.delete = fixture.delete;
      const response = await accessControlListApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteAccessControlListFromTrunk', () => {
    it('should make a DELETE request to remove an access control list entry from a trunk', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteAccessControlListFromTrunkRequestData = {
        trunkId: 'trunkId',
        accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
      };

      // When
      fixture.deleteFromTrunk.mockResolvedValue();
      accessControlListApi.deleteFromTrunk = fixture.deleteFromTrunk;
      const response = await accessControlListApi.deleteFromTrunk(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.deleteFromTrunk).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteIpRangeFromAccessControlList', () => {
    it('should make a DELETE request to remove an IP range to an access control list entry', async () => {
      // Given
      const requestData: ElasticSipTrunking.DeleteIpRangeFromAccessControlListRequestData = {
        accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
        ipRangeId: '01HA9BRJYR9Q7ZBDYMXHVWT8S8',
      };

      // When
      fixture.deleteIpRange.mockResolvedValue();
      accessControlListApi.deleteIpRange = fixture.deleteIpRange;
      const response = await accessControlListApi.deleteIpRange(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.deleteIpRange).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getAccessControlLists', () => {
    it('should make a GET request to fetch the list of Access Control List entries', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListAccessControlListRequestData = {};
      const mockData: ElasticSipTrunking.AccessControlList[] = [
        {
          name: 'My Access Control List',
          projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
          enabled: true,
          id: '01HA2E80QCBX185VVP21PJG9CT',
          createTime: new Date('2023-09-11T15:37:30'),
          updateTime: new Date('2023-09-11T15:38:14'),
          ipRanges: [
            {
              description: 'Location 1',
              ipAddress: '54.172.60.0',
              range: 30,
              projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
              accessControlListId: '01HA2E80QCBX185VVP21PJG9CT',
              id: '01HA2E80QMJS5G7MD576GJQD2X',
              createTime: new Date('2023-09-11T15:37:30'),
            },
            {
              description: 'Location 2',
              ipAddress: '54.244.51.0',
              range: 30,
              projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
              accessControlListId: '01HA2E80QCBX185VVP21PJG9CT',
              id: '01HA2E98KCZ1CNN0JP22F4JF3T',
              createTime: new Date('2023-09-11T15:38:11'),
            },
          ],
        },
        {
          name: 'My ACL 2',
          projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
          enabled: true,
          id: '01H7ZSW728SHB9984CDGFV37RM',
          createTime: new Date('2023-08-16T18:31:39'),
          updateTime: new Date('2023-08-25T07:51:40'),
          ipRanges: [
            {
              description: 'Location 1',
              ipAddress: '137.192.80.69',
              range: 32,
              projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
              accessControlListId: '01H8Y95DBJT31F104PWFVV9H8B',
              id: '01H8Y95DBSPQAN4MD4298TY05Y',
              createTime: new Date('2023-08-28T14:36:02'),
              updateTime: new Date('2023-09-05T10:45:53'),
            },
            {
              description: 'Location 2',
              ipAddress: '137.192.78.69',
              range: 32,
              projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
              accessControlListId: '01H8Y95DBJT31F104PWFVV9H8B',
              id: '01H8YC0JTSXXVPBECC289QZG0J',
              createTime: new Date('2023-08-28T15:25:50'),
              updateTime: new Date('2023-09-05T07:59:07'),
            },
            {
              description: 'Location 3',
              ipAddress: '20.20.20.20',
              range: 24,
              projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
              accessControlListId: '01H8Y95DBJT31F104PWFVV9H8B',
              id: '01HA1ZPH6E2BTSG0MFM38BRYF6',
              createTime: new Date('2023-09-11T11:23:17'),
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
      accessControlListApi.list = fixture.list;
      const response = await accessControlListApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getAccessControlListsForTrunk', () => {
    it('should make a GET request to fetch all access control list entries for a trunk', async () => {
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
      fixture.listForTrunk.mockResolvedValue(expectedResponse);
      accessControlListApi.listForTrunk = fixture.listForTrunk;
      const response = await accessControlListApi.listForTrunk(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listForTrunk).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getIpRangesForAccessControlList', () => {
    it('should make a GET request to fetch all IP ranges for an access control list entry', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListIpRangesForAccessControlListRequestData = {
        accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
      };
      const mockData: ElasticSipTrunking.IpRange[] = [
        {
          id: 'string',
          description: 'West wing of office',
          ipAddress: '10.0.1.1',
          range: 32,
          createTime: new Date('2021-11-01T23:20:50Z'),
          updateTime: new Date('2021-11-01T23:20:50Z'),
          projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
          accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listIpRanges.mockResolvedValue(expectedResponse);
      accessControlListApi.listIpRanges = fixture.listIpRanges;
      const response = await accessControlListApi.listIpRanges(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listIpRanges).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateAccessControlList', () => {
    it('should make a PUT request to update an existing Access Control List by ID', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateAccessControlListRequestData = {
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
        updateAccessControlListRequestBody: {
          name: 'Test Prague 5',
          enabled: false,
          ipRanges: [
            {
              description: 'Hradcany',
              ipAddress: '15.15.15.16',
              range: 20,
            },
          ],
        },
      };
      const expectedResponse: ElasticSipTrunking.AccessControlList = {
        name: 'Test Prague 5',
        projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
        enabled: false,
        id: '01HA9BRJW4J3QE4WBKVC337V4E',
        createTime: new Date('2023-09-14T08:08:48'),
        updateTime: new Date('2023-09-14T08:10:10.187513334'),
        ipRanges: [
          {
            description: 'Hradcany',
            ipAddress: '15.15.15.16',
            range: 20,
            projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
            accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
            id: '01HA9BRJYR9Q7ZBDYMXHVWT8S8',
            createTime: new Date('2023-09-14T08:08:48'),
          },
        ],
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      accessControlListApi.update = fixture.update;
      const response = await accessControlListApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateIpRangeFromAccessControlList', () => {
    it('should make a PUT request to update an IP range to an access control list entry', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateIpRangeFromAccessControlListRequestData = {
        accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
        ipRangeId: '01HA2E80QMJS5G7MD576GJQD2X',
        updateIpRangeRequestBody: {
          ipAddress: '11.12.13.14',
          range: 27,
        },
      };
      const expectedResponse: ElasticSipTrunking.IpRange = {
        id: '01HA2E80QMJS5G7MD576GJQD2X',
        description: 'Hradcany',
        ipAddress: '11.12.13.14',
        range: 27,
        createTime: new Date('2023-09-11T15:37:30'),
        updateTime: new Date('2023-09-11T15:38:30'),
        accessControlListId: '01HA9BRJW4J3QE4WBKVC337V4E',
        projectId: '3acb7ae1-cf3d-4112-ba5e-3a9d8c71cd47',
      };

      // When
      fixture.updateIpRange.mockResolvedValue(expectedResponse);
      accessControlListApi.updateIpRange = fixture.updateIpRange;
      const response = await accessControlListApi.updateIpRange(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.updateIpRange).toHaveBeenCalledWith(requestData);
    });
  });
});
