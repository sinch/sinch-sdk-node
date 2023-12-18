import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CallbackConfiguration,
  CallbackConfigurationApi,
  CallbackConfigurationApiFixture,
  GetCallbackConfigurationRequestData, UpdateCallbackConfigurationRequestData,
} from '../../../../src';

describe('CallbackConfigurationApi', () => {
  let callbackConfigurationApi: CallbackConfigurationApi;
  let fixture: CallbackConfigurationApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CallbackConfigurationApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    callbackConfigurationApi = new CallbackConfigurationApi(credentials);
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
      callbackConfigurationApi.get = fixture.get;
      const response = await callbackConfigurationApi.get(requestData);

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
      callbackConfigurationApi.update = fixture.update;
      const response = await callbackConfigurationApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
