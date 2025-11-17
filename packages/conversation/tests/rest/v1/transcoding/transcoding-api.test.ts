import { SinchClientParameters } from '@sinch/sdk-client';
import {
  TranscodingApi,
  TranscodingApiFixture,
  Conversation,
  LazyConversationApiClient,
} from '../../../../src';

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
    const lazyClient = new LazyConversationApiClient(credentials);
    transcodingApi = new TranscodingApi(lazyClient);
  });


  describe ('transcodeMessage', () => {
    it('should make a POST request to transcode a generic message to a channel-specific one', async () => {
      // Given
      const requestData: Conversation.TranscodeMessageRequestData = {
        transcodeMessageRequestBody: {
          app_id: 'app_id',
          app_message: {
            text_message: {
              text: 'Text message to be transcoded',
            },
          },
          channels: [
            'APPLEBC',
            'VIBERBM',
          ],
        },
      };
      const expectedResponse: Conversation.TranscodeMessageResponse = {
        transcoded_message: {
          APPLEBC: 'string',
          VIBERBM: 'string',
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
