import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  ApplicationsApi,
  ApplicationsApiFixture,
  Voice,
} from '../../../../src';

describe('ApplicationsApi', () => {
  let applicationsApi: ApplicationsApi;
  let fixture: ApplicationsApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new ApplicationsApiFixture();
    apiClientOptions = {
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    applicationsApi = new ApplicationsApi(apiClientOptions);
  });

  describe ('queryNumber', () => {
    it('should make a GET request to get information about the requested number', async () => {
      // Given
      const requestData: Voice.QueryNumberRequestData = {
        number: '+14151112223333',
      };
      const expectedResponse: Voice.QueryNumberResponse = {
        method: 'numberItem',
        number: {
          countryId: 'US',
          numberType: 'Mobile',
          normalizedNumber: '+14151112223333',
          restricted: false,
          rate: {
            currencyId: 'USD',
            amount: 0.368,
          },
        },
      };

      // When
      fixture.queryNumber.mockResolvedValue(expectedResponse);
      applicationsApi.queryNumber = fixture.queryNumber;
      const response = await applicationsApi.queryNumber(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.queryNumber).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCallbackURLs', () => {
    it('should make a GET request to return any callback URLs configured for the specified application', async () => {
      // Given
      const requestData: Voice.GetCallbackURLsRequestData = {
        applicationkey: 'APPLICATION_KEY',
      };
      const expectedResponse: Voice.GetCallbacks = {
        url:{
          primary: 'primaryCallBackUrl',
          fallback: 'fallbackCallbackUrl',
        },
      };

      // When
      fixture.getCallbackURLs.mockResolvedValue(expectedResponse);
      applicationsApi.getCallbackURLs = fixture.getCallbackURLs;
      const response = await applicationsApi.getCallbackURLs(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getCallbackURLs).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getNumbers', () => {
    it('should make a GET request to get information about your numbers', async () => {
      // Given
      const requestData: Voice.GetNumbersRequestData = {};
      const expectedResponse: Voice.ListNumbersResponse = {
        numbers: [
          {
            number: '33444555666',
            applicationkey: 'APPLICATION_KEY',
            capability: 'voice',
          },
        ],
      };

      // When
      fixture.listNumbers.mockResolvedValue(expectedResponse);
      applicationsApi.listNumbers = fixture.listNumbers;
      const response = await applicationsApi.listNumbers(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listNumbers).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('unassignNumber', () => {
    it('should make a DELETE request to un-assign a number from an application', async () => {
      // Given
      const requestData: Voice.UnassignNumberRequestData = {
        unassignNumbersRequestBody: {
          number: '+33444555666',
          applicationkey: 'APPLICATION_KEY',
          capability: 'voice',
        },
      };

      // When
      fixture.unassignNumber.mockResolvedValue();
      applicationsApi.unassignNumber = fixture.unassignNumber;
      const response = await applicationsApi.unassignNumber(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.unassignNumber).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateCallbackURLs', () => {
    it('should make a POST request to update the configured callback URL', async () => {
      // Given
      const requestData: Voice.UpdateCallbackURLsRequestData = {
        applicationkey: 'APPLICATION_KEY',
        updateCallbacksRequestBody: {
          url: {
            primary: 'primaryCallBackUrl',
            fallback: 'fallbackCallbackUrl',
          },
        },
      };


      // When
      fixture.updateCallbackURLs.mockResolvedValue();
      applicationsApi.updateCallbackURLs = fixture.updateCallbackURLs;
      const response = await applicationsApi.updateCallbackURLs(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.updateCallbackURLs).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateNumbers', () => {
    it('should make a POST request to assign some numbers to an application', async () => {
      // Given
      const requestData: Voice.AssignNumbersRequestData = {
        assignNumbersRequestBody: {
          numbers: [
            '+33444555666',
            '+33777888999',
          ],
          applicationkey: 'APPLICATION_KEY',
          capability: 'voice',
        },
      };

      // When
      fixture.assignNumbers.mockResolvedValue();
      applicationsApi.assignNumbers = fixture.assignNumbers;
      const response = await applicationsApi.assignNumbers(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.assignNumbers).toHaveBeenCalledWith(requestData);
    });
  });
});
