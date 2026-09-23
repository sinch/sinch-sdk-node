import { resolveClientParameters } from '@sinch/sdk-client';
import {
  LazyVoiceV2ApiClient,
  Voice,
  VoiceV2SvamlApi,
  VoiceV2SvamlApiFixture,
} from '../../../../src';

describe('VoiceV2SvamlApi', () => {
  let svamlApi: VoiceV2SvamlApi;
  let fixture: VoiceV2SvamlApiFixture;

  const sampleSvaml: Voice.v2.SvamlInput = {
    callName: 'incoming',
    commands: [
      {
        command: 'answer',
      },
      {
        command: 'messages',
        messages: [
          {
            type: 'SAY',
            say: {
              text: 'Welcome to ACME support.',
              voiceName: 'Emma',
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    fixture = new VoiceV2SvamlApiFixture();
    const lazyClient = new LazyVoiceV2ApiClient(resolveClientParameters({
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    }));
    svamlApi = new VoiceV2SvamlApi(lazyClient);
  });

  describe('describeSvaml', () => {
    it('should make a POST request to describe a SVAML payload', async () => {
      // Given
      const requestData: Voice.v2.DescribeSvamlRequestData = {
        describeSvamlRequestBody: {
          svaml: sampleSvaml,
        },
      };
      const expectedResponse: Voice.v2.SvamlDescriptionResponse = {
        description: 'The call is answered and a TTS message is played using the voice Emma.',
      };

      // When
      fixture.describe.mockResolvedValue(expectedResponse);
      svamlApi.describe = fixture.describe;
      const response = await svamlApi.describe(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.describe).toHaveBeenCalledWith(requestData);
    });
  });

  describe('validateSvaml', () => {
    it('should make a POST request to validate a SVAML payload', async () => {
      // Given
      const requestData: Voice.v2.ValidateSvamlRequestData = {
        validateSvamlRequestBody: {
          validationType: 'STRICT',
          svaml: sampleSvaml,
        },
      };
      const expectedResponse: Voice.v2.ValidateSvamlResponse = {
        isValid: true,
      };

      // When
      fixture.validate.mockResolvedValue(expectedResponse);
      svamlApi.validate = fixture.validate;
      const response = await svamlApi.validate(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.validate).toHaveBeenCalledWith(requestData);
    });

    it('should return validation errors when the SVAML payload is invalid', async () => {
      // Given
      const requestData: Voice.v2.ValidateSvamlRequestData = {
        validateSvamlRequestBody: {
          svaml: sampleSvaml,
        },
      };
      const expectedResponse: Voice.v2.ValidateSvamlResponse = {
        isValid: false,
        errors: [
          'Invalid dial command. Missing destination.',
        ],
      };

      // When
      fixture.validate.mockResolvedValue(expectedResponse);
      svamlApi.validate = fixture.validate;
      const response = await svamlApi.validate(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.validate).toHaveBeenCalledWith(requestData);
    });
  });
});
