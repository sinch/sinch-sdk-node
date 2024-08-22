import { SinchClientParameters } from '@sinch/sdk-client';
import {
  GroupsApi,
  GroupsApiFixture,
  Sms,
} from '../../../../src';

describe('GroupsApi', () => {
  let groupsApi: GroupsApi;
  let fixture: GroupsApiFixture;
  let paramsWithServicePlanId: SinchClientParameters;

  beforeEach(() => {
    fixture = new GroupsApiFixture();
    paramsWithServicePlanId = {
      servicePlanId: 'SERVICE_PLAN_ID',
      apiToken: 'API_TOKEN',
    };
    groupsApi = new GroupsApi(paramsWithServicePlanId);
  });

  describe ('createGroup', () => {
    it('should make a POST request to create a group', async () => {
      // Given
      const requestData: Sms.CreateGroupRequestData = {
        createGroupRequestBody: {
          name: 'My group',
          members: [
            '+33111222333',
            '+33444555666',
          ],
        },
      };
      const expectedResponse: Sms.Group = {
        id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        name: 'My group',
        size: 2,
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:34:56.789Z'),
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      groupsApi.create = fixture.create;
      const response = await groupsApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteGroup', () => {
    it('should make a DELETE request to delete a group', async () => {
      // Given
      const requestData: Sms.DeleteGroupRequestData = {
        group_id: '01HF6EFE21REWJC3B3JWG4FYZ7',
      };
      const expectedResponse: void = undefined;

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      groupsApi.delete = fixture.delete;
      const response = await groupsApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getMembers', () => {
    it('should make a GET request to list the members of a group', async () => {
      // Given
      const requestData: Sms.ListMembersRequestData = {
        group_id: '01HF6EFE21REWJC3B3JWG4FYZ7',
      };
      const expectedResponse: string[] = [
        '33111222333',
        '33444555666',
      ];

      // When
      fixture.listMembers.mockResolvedValue(expectedResponse);
      groupsApi.listMembers = fixture.listMembers;
      const response = await groupsApi.listMembers(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listMembers).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listGroups', () => {
    it('should make a GET request to list the existing groups', async () => {
      // Given
      const requestData: Sms.ListGroupsRequestData = {};

      const mockData: Sms.Group[] =[
        {
          id: '01HF6EFE21REWJC3B3JWG4FYZ7',
          name: 'My group',
          size: 2,
          created_at: new Date('2023-11-16T12:34:56.789Z'),
          modified_at: new Date('2023-11-16T12:34:56.789Z'),
          child_groups: [],
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
      groupsApi.list = fixture.list;
      const response = await groupsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('replaceGroup', () => {
    it('should make a PUT request to replace the members of a group', async () => {
      // Given
      const requestData: Sms.ReplaceGroupRequestData = {
        group_id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        replaceGroupRequestBody: {
          name: 'My new group name',
          members: [
            '+33777888999',
          ],
        },
      };
      const expectedResponse: Sms.Group = {
        id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        name: 'My new group name',
        size: 1,
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:44:56.789Z'),
      };

      // When
      fixture.replace.mockResolvedValue(expectedResponse);
      groupsApi.replace = fixture.replace;
      const response = await groupsApi.replace(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.replace).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('retrieveGroup', () => {
    it('should make a GET request to retrieve a group by its ID', async () => {
      // Given
      const requestData: Sms.GetGroupRequestData = {
        group_id: '01HF6EFE21REWJC3B3JWG4FYZ7',
      };
      const expectedResponse: Sms.Group = {
        id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        name: 'My new group name',
        size: 1,
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:34:56.789Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      groupsApi.get = fixture.get;
      const response = await groupsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateGroup', () => {
    it('should make a POST request to update the members of a group', async () => {
      // Given
      const requestData: Sms.UpdateGroupRequestData = {
        group_id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        updateGroupRequestBody: {
          add: [
            '+33111222333',
            '+33444555666',
          ],
        },
      };
      const expectedResponse: Sms.Group = {
        id: '01HF6EFE21REWJC3B3JWG4FYZ7',
        name: 'My new group name',
        size: 3,
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:44:56.789Z'),
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      groupsApi.update = fixture.update;
      const response = await groupsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
