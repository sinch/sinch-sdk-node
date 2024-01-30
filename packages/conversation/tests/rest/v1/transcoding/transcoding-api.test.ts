import { SinchClientParameters } from '@sinch/sdk-client';
import { TranscodeMessageRequestData, TranscodeMessageResponse } from '../../../../src';
import { TranscodingApi, TranscodingApiFixture } from '../../../../src';

describe('TranscodingApi', () => {
  let transcodingApi: TranscodingApi;
  let fixture: TranscodingApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new TranscodingApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    transcodingApi = new TranscodingApi(credentials);
  });


  describe ('transcodeMessage', () => {
    it('should make a POST request to transcode a generic message to a channel-specific one', async () => {
      // Given
      const requestData: TranscodeMessageRequestData = {
        transcodeMessageRequestBody: {
          app_id: 'app_id',
          app_message: {
            text_message: {
              text: 'Text message to be transcoded',
            },
          },
          channels: [
            'WHATSAPP',
          ],
        },
      };
      const expectedResponse: TranscodeMessageResponse = {
        transcoded_message: {
          property1: 'string',
          property2: 'string',
        },
      };

      // When
      fixture.transcodeMessage.mockResolvedValue(expectedResponse);
      transcodingApi.transcodeMessage = fixture.transcodeMessage;
      const response = await transcodingApi.transcodeMessage(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.transcodeMessage).toHaveBeenCalledWith(requestData);
    });
  });
});
