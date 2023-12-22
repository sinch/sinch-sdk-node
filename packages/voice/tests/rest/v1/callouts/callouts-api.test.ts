import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  CalloutsApi,
  CalloutsApiFixture,
  CalloutsRequestData,
  GetCalloutResponseObj,
} from '../../../../src';

describe('CalloutsApi', () => {
  let calloutsApi: CalloutsApi;
  let fixture: CalloutsApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new CalloutsApiFixture();
    apiClientOptions = {
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    calloutsApi = new CalloutsApi(apiClientOptions);
  });

  describe ('callouts', () => {
    it('should make a POST request to make a call out to a phone number', async () => {
      // Given
      const requestData: CalloutsRequestData = {
        calloutRequestBody: {
          method: 'ttsCallout',
          ttsCallout: {
            destination: {
              type: 'number',
              endpoint: '+33444555666',
            },
            domain: 'pstn',
            text: 'test to speech'
          },
        },
      };
      const expectedResponse: GetCalloutResponseObj = {
        callId: 'callId',
      };

      // When
      fixture.callouts.mockResolvedValue(expectedResponse);
      calloutsApi.callouts = fixture.callouts;
      const response = await calloutsApi.callouts(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.callouts).toHaveBeenCalledWith(requestData);
    });
  });
});
