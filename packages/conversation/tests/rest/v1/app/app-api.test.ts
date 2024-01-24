import { SinchClientParameters } from '@sinch/sdk-client';
import {
  AppResponse,
  CreateAppRequestData,
  DeleteAppRequestData,
  GetAppRequestData,
  ListAppsRequestData, UpdateAppRequestData,
} from '../../../../src';
import { ListAppsResponse } from '../../../../src';
import { AppApi, AppApiFixture } from '../../../../src';

describe('AppApi', () => {
  let appApi: AppApi;
  let fixture: AppApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new AppApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    appApi = new AppApi(credentials);
  });


  describe ('createApp', () => {
    it('should make a POST request to create a new Conversation App', async () => {
      // Given
      const requestData: CreateAppRequestData = {
        appCreateRequestBody: {
          display_name: 'Test App',
          channel_credentials: [
            {
              channel: 'WHATSAPP',
              static_bearer: {
                claimed_identity: 'identity',
                token: 'token',
              },
            },
          ],
        },
      };
      const expectedResponse: AppResponse = {
        id: 'app_id',
        display_name: 'Test App',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      appApi.create = fixture.create;
      const response = await appApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteApp', () => {
    it('should make a DELETE request to delete the specified App ID', async () => {
      // Given
      const requestData: DeleteAppRequestData = {
        app_id: 'app_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      appApi.delete = fixture.delete;
      const response = await appApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getApp', () => {
    it('should make a GET request to retrieve the particular app as specified by the App ID', async () => {
      // Given
      const requestData: GetAppRequestData = {
        app_id: 'app_id',
      };
      const expectedResponse: AppResponse = {
        id: 'app_id',
        display_name: 'Test App',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      appApi.get = fixture.get;
      const response = await appApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listApps', () => {
    it('should make a GET request to get the list of all apps', async () => {
      // Given
      const requestData: ListAppsRequestData = {};
      const expectedResponse: ListAppsResponse = {
        apps: [
          {
            id: 'app_id',
            display_name: 'Test App',
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      appApi.list = fixture.list;
      const response = await appApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateApp', () => {
    it('should make a PATCH request to update a particular app as specified by the App ID', async () => {
      // Given
      const requestData: UpdateAppRequestData = {
        app_id: 'app_id',
        appUpdateRequestBody: {
          display_name: 'New display name',
        },
      };
      const expectedResponse: AppResponse = {
        id: 'app_id',
        display_name: 'New display name',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      appApi.update = fixture.update;
      const response = await appApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
