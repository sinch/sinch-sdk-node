import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CallbackConfiguration,
  CallbacksApi,
  CallbackConfigurationApiFixture,
  GetCallbackConfigurationRequestData, UpdateCallbackConfigurationRequestData,
} from '../../../../src';

describe('CallbackConfigurationApi', () => {
  let callbacksApi: CallbacksApi;
  let fixture: CallbackConfigurationApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CallbackConfigurationApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    callbacksApi = new CallbacksApi(credentials);
  });

  describe ('getCallbackConfiguration', () => {
    it('should make a GET request to retrieve the callbacks configuration for the specified project', async () => {
      // Given
      const requestData: GetCallbackConfigurationRequestData = {};
      const expectedResponse: CallbackConfiguration = {
        projectId: 'projectIdFromDashboard',
        hmacSecret: 'hmacSecret',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      callbacksApi.get = fixture.get;
      const response = await callbacksApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCallbackConfiguration', () => {
    it('should make a PATCH request to update the callbacks configuration for the specified project', async () => {
      // Given
      const requestData: UpdateCallbackConfigurationRequestData = {
        callbackConfigurationUpdateRequestBody: {
          hmacSecret: 'newHmacSecret',
        },
      };
      const expectedResponse: CallbackConfiguration = {
        projectId: 'projectIdFromDashboard',
        hmacSecret: 'newHmacSecret',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      callbacksApi.update = fixture.update;
      const response = await callbacksApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
