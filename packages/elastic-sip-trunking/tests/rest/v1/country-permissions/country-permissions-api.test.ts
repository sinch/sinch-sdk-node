import { SinchClientParameters } from '@sinch/sdk-client';
import { CountryPermissionsApi, CountryPermissionsApiFixture, ElasticSipTrunking } from '../../../../src';

describe('CountryPermissionsApi', () => {
  let countryPermissionsApi: CountryPermissionsApi;
  let fixture: CountryPermissionsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CountryPermissionsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    countryPermissionsApi = new CountryPermissionsApi(credentials);
  });


  describe ('getCountryPermission', () => {
    it('should make a GET request to fetch the requested country permission', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetCountryPermissionRequestData = {
        isoCode: 'US',
      };
      const expectedResponse: ElasticSipTrunking.CountryPermission = {
        isoCode: 'US',
        name: 'United States/Canada',
        continent: 'North America',
        countryDialingCodes: [
          '+1',
        ],
        enabled: true,
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      countryPermissionsApi.get = fixture.get;
      const response = await countryPermissionsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCountryPermissions', () => {
    it('should make a GET request to fetch the list of country permissions', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListCountryPermissionsRequestData = {};
      const expectedResponse: ElasticSipTrunking.ListCountryPermissionsResponse = {
        countryPermissions: [
          {
            isoCode: 'US',
            name: 'United States/Canada',
            continent: 'North America',
            countryDialingCodes: [
              '+1',
            ],
            enabled: true,
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      countryPermissionsApi.list = fixture.list;
      const response = await countryPermissionsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCountryPermission', () => {
    it('should make a PUT request to update the requested country permission', async () => {
      // Given
      const requestData: ElasticSipTrunking.UpdateCountryPermissionRequestData = {
        isoCode: 'US',
        updateCountryPermissionRequestBody: {
          enabled: false,
          name: 'United States only',
        },
      };
      const expectedResponse: ElasticSipTrunking.CountryPermission = {
        isoCode: 'US',
        name: 'United States only',
        continent: 'North America',
        countryDialingCodes: [
          '+1',
        ],
        enabled: true,
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      countryPermissionsApi.update = fixture.update;
      const response = await countryPermissionsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
