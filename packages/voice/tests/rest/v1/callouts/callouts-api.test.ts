import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  CalloutsApi,
  CalloutsApiFixture, ConferenceCalloutRequestData, CustomCalloutRequestData,
  GetCalloutResponseObj,
  TtsCalloutRequestData,
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

  describe ('TTS callouts', () => {
    it('should make a POST request to make a TTS callout to a phone number', async () => {
      // Given
      const requestData: TtsCalloutRequestData = {
        ttsCalloutRequestBody: {
          method: 'ttsCallout',
          ttsCallout: {
            cli: '+14045001000',
            destination: {
              type: 'number',
              endpoint: '+14045005000',
            },
            domain: 'pstn',
            text: 'text to speech',
          },
        },
      };
      const expectedResponse: GetCalloutResponseObj = {
        callId: 'callId',
      };

      // When
      fixture.tts.mockResolvedValue(expectedResponse);
      calloutsApi.tts = fixture.tts;
      const response = await calloutsApi.tts(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.tts).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('Conference callouts', () => {
    it('should make a POST request to make a conference callout to a phone number', async () => {
      // Given
      const requestData: ConferenceCalloutRequestData = {
        conferenceCalloutRequestBody: {
          method: 'conferenceCallout',
          conferenceCallout: {
            cli: '+14045001000',
            conferenceId: 'conferenceId',
            destination: {
              type: 'number',
              endpoint: '+14045005000',
            },
            domain: 'pstn',
          },
        },
      };
      const expectedResponse: GetCalloutResponseObj = {
        callId: 'callId',
      };

      // When
      fixture.conference.mockResolvedValue(expectedResponse);
      calloutsApi.conference = fixture.conference;
      const response = await calloutsApi.conference(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.conference).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('Custom callouts', () => {
    it('should make a POST request to make a Custom callout to a phone number', async () => {
      // Given
      const requestData: CustomCalloutRequestData = {
        customCalloutRequestBody: {
          method: 'customCallout',
          customCallout: {
            cli: '+14045001000',
            destination: {
              type: 'number',
              endpoint: '+14045005000',
            },
          },
        },
      };
      const expectedResponse: GetCalloutResponseObj = {
        callId: 'callId',
      };

      // When
      fixture.custom.mockResolvedValue(expectedResponse);
      calloutsApi.custom = fixture.custom;
      const response = await calloutsApi.custom(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.custom).toHaveBeenCalledWith(requestData);
    });
  });
});
