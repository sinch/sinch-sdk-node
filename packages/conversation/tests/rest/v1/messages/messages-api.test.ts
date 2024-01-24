import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ConversationMessage,
  DeleteMessageRequestData,
  GetMessageRequestData,
  ListMessagesRequestData, SendMessageRequestData,
} from '../../../../src';
import { SendMessageResponse } from '../../../../src';
import { MessagesApi, MessagesApiFixture } from '../../../../src';

describe('MessagesApi', () => {
  let messagesApi: MessagesApi;
  let fixture: MessagesApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new MessagesApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    messagesApi = new MessagesApi(credentials);
  });


  describe ('deleteMessage', () => {
    it('should make a DELETE request to delete a specific message by its ID', async () => {
      // Given
      const requestData: DeleteMessageRequestData = {
        message_id: 'message_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.deleteMessage.mockResolvedValue(expectedResponse);
      messagesApi.deleteMessage = fixture.deleteMessage;
      const response = await messagesApi.deleteMessage(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.deleteMessage).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getMessage', () => {
    it('should make a GET request to retrieve a specific message by its ID', async () => {
      // Given
      const requestData: GetMessageRequestData = {
        message_id: 'message_id',
      };
      const expectedResponse: ConversationMessage = {
        accept_time: new Date('2019-08-24T14:15:22Z'),
        app_message: {
          message: {
            card_message: {
              choices: [],
              description: 'description',
              height: 'UNSPECIFIED_HEIGHT',
              media_message: {
                url: 'url',
              },
              title: 'title',
            },
          },
          explicit_channel_message: {},
          additionalProperties: {
            contact_name: 'contactName',
          },
        },
        channel_identity: {
          app_id: 'app_id',
          channel: 'WHATSAPP',
          identity: 'identity',
        },
        contact_id: 'contact_id',
        contact_message: {
          choice_response_message: {
            message_id: 'message_id',
            postback_data: 'postback-data',
          },
          fallback_message: {
            raw_message: 'raw',
            reason: {
              code: 'UNKNOWN',
              description: 'description',
              sub_code: 'UNSPECIFIED_SUB_CODE',
            },
          },
          location_message: {
            title: 'title',
            label: 'label',
            coordinates: {
              latitude: 0,
              longitude: 0,
            },
          },
          media_card_message: {
            url: 'url',
            caption: 'caption',
          },
          media_message: {
            url: 'url',
            filename_override: 'filename',
            thumbnail_url: 'thumbnail',
          },
          reply_to: {
            message_id: 'message_id',
          },
          text_message: {
            text: 'text',
          },
        },
        conversation_id: 'conversation_id',
        direction: 'UNDEFINED_DIRECTION',
        id: 'id',
        metadata: 'metadata',
        injected: true,
      };

      // When
      fixture.getMessage.mockResolvedValue(expectedResponse);
      messagesApi.getMessage = fixture.getMessage;
      const response = await messagesApi.getMessage(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getMessage).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listMessages', () => {
    it('should make a GET request to list all the messages sent or received', async () => {
      // Given
      const requestData: ListMessagesRequestData = {};
      const mockData: ConversationMessage[] = [
        {
          accept_time: new Date('2019-08-24T14:15:22Z'),
          app_message: {
            message: {
              card_message: {
                choices: [
                  {
                    call_message: {
                      title: 'title',
                      phone_number: 'number',
                    },
                    location_message: {
                      coordinates: {
                        latitude: 0,
                        longitude: 0,
                      },
                      title: 'title',
                      label: 'label',
                    },
                    postback_data: 'data',
                    text_message: {
                      text: 'text',
                    },
                    url_message: {
                      url: 'url',
                      title: 'title',
                    },
                  },
                ],
                description: 'description',
                height: 'UNSPECIFIED_HEIGHT',
                media_message: {
                  url: 'url',
                },
                title: 'title',
              },
            },
            explicit_channel_message: {},
            additionalProperties: {
              contact_name: 'contact_name',
            },
          },
          channel_identity: {
            identity: 'identity',
            app_id: 'app_id',
            channel: 'WHATSAPP',
          },
          contact_id: 'contact_id',
          contact_message: {

          },
          conversation_id: 'conversation_id',
          direction: 'UNDEFINED_DIRECTION',
          id: 'id',
          metadata: 'metadata',
          injected: true,
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listMessages.mockResolvedValue(expectedResponse);
      messagesApi.listMessages = fixture.listMessages;
      const response = await messagesApi.listMessages(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listMessages).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('sendMessage', () => {
    it('should make a POST request to send a request from a conversation app to a contact', async () => {
      // Given
      const requestData: SendMessageRequestData = {
        sendMessageRequestBody: {
          app_id: 'app_id',
          recipient: {
            contact_id: 'contact_id',
          },
          message: {
            message: {
              text_message: {
                text: 'text',
              },
            },
          },
        },
      };
      const expectedResponse: SendMessageResponse = {
        accepted_time: new Date('2019-08-24T14:15:22Z'),
        message_id: 'message_id',
      };

      // When
      fixture.sendMessage.mockResolvedValue(expectedResponse);
      messagesApi.sendMessage = fixture.sendMessage;
      const response = await messagesApi.sendMessage(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.sendMessage).toHaveBeenCalledWith(requestData);
    });
  });
});
