import { SinchClientParameters } from '@sinch/sdk-client';
import { LazyNumberLookupApiClient, NumberLookup } from '../../../../src';
import { NumberLookupApi, NumberLookupApiFixture } from '../../../../src';

describe('NumberLookupApi', () => {
  let numberLookupApi: NumberLookupApi;
  let fixture: NumberLookupApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new NumberLookupApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyNumberLookupApiClient(credentials);
    numberLookupApi = new NumberLookupApi(lazyClient);
  });

  describe('numberLookup', () => {
    it('should make a POST request to lookup a phone number features', async () => {
      // Given
      const requestData: NumberLookup.NumberLookupRequestData = {
        numberLookupRequestBody: {
          number: '+12015555555',
          features: [ 'LineType', 'SimSwap', 'VoIPDetection', 'RND'],
          rndFeatureOptions: {
            contactDate: '2026-01-01',
          },
        },
      };
      const expectedResponse: NumberLookup.NumberLookupResponse = {
        line: {
          carrier: 'AT&T',
          type: 'Mobile',
          mobileCountryCode: '310',
          mobileNetworkCode: '070',
          ported: true,
          portingDate: new Date('2010-08-07T23:45:49+00:00'),
        },
        simSwap: {
          error: {
            status: 100,
            title: 'Feature Disabled',
            detail: 'SimSwap feature is currently disabled.',
          },
        },
        voIPDetection: {
          error: {
            status: 100,
            title: 'Feature Disabled',
            detail: 'VoIPDetection feature is currently disabled.',
          },
        },
        rnd: {
          error: {
            status: 100,
            title: 'Feature Disabled',
            detail: 'RND feature is currently disabled.',
          },
        },
        countryCode: 'US',
        traceId: '5c817a6b7351d80a6b1d8007e5c145b8',
        number: '+12015555555',
      };

      // When
      fixture.lookup.mockResolvedValue(expectedResponse);
      numberLookupApi.lookup = fixture.lookup;
      const response = await numberLookupApi.lookup(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.lookup).toHaveBeenCalledWith(requestData);
    });
  });
});
