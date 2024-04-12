import { SinchClientParameters } from '@sinch/sdk-client';
import {
  AvailableRegionsApi,
  AvailableRegionsApiFixture,
  Numbers,
} from '../../../../src';

describe('AvailableRegionsApi', () => {
  let availableRegionsApi: AvailableRegionsApi;
  let fixture: AvailableRegionsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new AvailableRegionsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    availableRegionsApi = new AvailableRegionsApi(credentials);
  });

  describe ('listAvailableRegions', () => {
    it('should make a GET request to list all regions for numbers type provided for the project ID', async () => {
      // Given
      const requestData: Numbers.ListAvailableRegionsRequestData = {
        types: ['LOCAL'],
      };
      const expectedResponse: Numbers.ListAvailableRegionsResponse = {
        availableRegions: [
          {
            regionCode: 'AR',
            regionName: 'Argentina',
            types: [
              'LOCAL',
            ],
          },
          {
            regionCode: 'US',
            regionName: 'United States',
            types: [
              'LOCAL',
            ],
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      availableRegionsApi.list = fixture.list;
      const response = await availableRegionsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });
});
