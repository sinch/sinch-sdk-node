import { SinchClientParameters } from '@sinch/sdk-client';
import {
  Provisioning,
  LazyProvisioningApiClient,
} from '../../../../../src';
import { RcsAccountsApi, RcsAccountsApiFixture } from '../../../../../src/rest/v1/rcs/accounts';

describe('RcsAccountsApi', () => {
  let accountsApi: RcsAccountsApi;
  let fixture: RcsAccountsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new RcsAccountsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyProvisioningApiClient(credentials);
    accountsApi = new RcsAccountsApi(lazyClient);
  });

  describe('createComment', () => {
    it('should make a POST request to create a comment for an RCS account', async () => {
      const requestData: Provisioning.CreateCommentRequestData = {
        rcsCommentCreateRequestBody: {
          comment: 'Example comment',
        },
      };
      const expectedResponse: Provisioning.RcsComment = {
        type: 'CREATED',
        comment: 'Example comment',
        created: new Date('2023-01-19T13:11:08.204Z'),
      };

      fixture.createComment.mockResolvedValue(expectedResponse);
      accountsApi.createComment = fixture.createComment;
      const response = await accountsApi.createComment(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.createComment).toHaveBeenCalledWith(requestData);
    });
  });

  describe('listActivities', () => {
    it('should make a GET request to list activities on an RCS account', async () => {
      const requestData: Provisioning.ListActivitiesRequestData = {
        pageSize: 50,
      };
      const mockData: Provisioning.RcsAccountNotification[] = [
        {
          type: 'CREATED',
          created: new Date('2023-02-10T11:41:14.202Z'),
          author: 'Provisioning API user',
        },
        {
          type: 'COMMENT_ADDED',
          created: new Date('2023-02-10T11:41:14.202Z'),
          comment: 'Example comment',
          author: 'Provisioning API user',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      fixture.listActivities.mockResolvedValue(expectedResponse);
      accountsApi.listActivities = fixture.listActivities;
      const response = await accountsApi.listActivities(requestData);

      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listActivities).toHaveBeenCalledWith(requestData);
    });
  });
});
