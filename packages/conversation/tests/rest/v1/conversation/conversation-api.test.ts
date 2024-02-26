import { SinchClientParameters } from '@sinch/sdk-client';
import {
  Conversation,
  CreateConversationRequestData,
  ConversationApi,
  ConversationApiFixture,
  DeleteConversationRequestData,
  GetConversationRequestData,
  InjectMessageRequestData,
  ListConversationsRequestData,
  StopActiveConversationRequestData,
  UpdateConversationRequestData,
  ListRecentConversationsRequestData,
  ConversationRecentMessage,
  InjectEventRequestData,
  InjectEventResponse,
} from '../../../../src';

describe('ConversationApi', () => {
  let conversationApi: ConversationApi;
  let fixture: ConversationApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ConversationApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    conversationApi = new ConversationApi(credentials);
  });


  describe ('createConversation', () => {
    it('should make a POST request to create a new empty conversation', async () => {
      // Given
      const requestData: CreateConversationRequestData = {
        createConversationRequestBody: {
          app_id: 'app_id',
          contact_id: 'contact_id',
        },
      };
      const expectedResponse: Conversation = {
        id: 'conversation_id',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      conversationApi.create = fixture.create;
      const response = await conversationApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteConversation', () => {
    it('should make a DELETE request to delete a conversation and all messages related', async () => {
      // Given
      const requestData: DeleteConversationRequestData = {
        conversation_id: 'conversation_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      conversationApi.delete = fixture.delete;
      const response = await conversationApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getConversation', () => {
    it('should make a GET request to retrieve a conversation by id', async () => {
      // Given
      const requestData: GetConversationRequestData = {
        conversation_id: 'conversation_id',
      };
      const expectedResponse: Conversation = {
        id: 'conversation_id',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      conversationApi.get = fixture.get;
      const response = await conversationApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('injectEvent', () => {
    it('should make a POST request to inject a conversation event into a specific conversation', async () => {
      // Given
      const requestData: InjectEventRequestData = {
        conversation_id: 'conversation_id',
        injectConversationEventRequestBody: {
          app_event: {
            agent_joined_event: {
              agent: {
                display_name: 'agent_name',
                type: 'BOT',
                picture_url: 'picture_url',
              },
            },
          },
          conversation_id: 'conversation_id',
          contact_id: 'contact_id',
          channel_identity: {
            channel: 'MESSENGER',
            identity: 'identity',
            app_id: 'app_id',
          },
          accept_time: new Date('2019-08-24T14:15:22Z'),
          processing_mode: 'CONVERSATION',
        },
      };
      const expectedResponse: InjectEventResponse = {
        event_id: 'event_id',
        accepted_time: new Date('2019-08-24T14:15:22Z'),
      };

      // When
      fixture.injectEvent.mockResolvedValue(expectedResponse);
      conversationApi.injectEvent = fixture.injectEvent;
      const response = await conversationApi.injectEvent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.injectEvent).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('injectMessage', () => {
    it('should make a POST request to inject a conversation message in to a specific conversation', async () => {
      // Given
      const requestData: InjectMessageRequestData = {
        conversation_id: 'conversation_id',
        injectMessageRequestBody: {
          app_message: {
            card_message: {
              choices: [],
              title: 'title',
              description: 'description',
            },
          },
        },
      };
      const expectedResponse: any = {};

      // When
      fixture.injectMessage.mockResolvedValue(expectedResponse);
      conversationApi.injectMessage = fixture.injectMessage;
      const response = await conversationApi.injectMessage(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.injectMessage).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listConversations', () => {
    it('should make a GET request to ...', async () => {
      // Given
      const requestData: ListConversationsRequestData = {
        only_active: false,
      };
      const mockData: Conversation[] = [
        {
          id: 'conversation_id',
          active: true,
        },
      ];
      const expectedResponse= {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      conversationApi.list = fixture.list;
      const response = await conversationApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listRecentConversations', () => {
    it('should make a GET request to list conversations and their most recent message', async () => {
      // Given
      const requestData: ListRecentConversationsRequestData = {
        app_id: 'app_id',
        order: 'ASC',
      };
      const mockData: ConversationRecentMessage[] = [
        {
          conversation: {
            active: true,
            active_channel: 'WHATSAPP',
            app_id: 'app_id',
            contact_id: 'contact_id',
            id: 'conversation_id',
            last_received: new Date('2019-08-24T14:15:22Z'),
            metadata: 'metadata',
            metadata_json: {},
            correlation_id: 'correlation_id',
          },
          last_message: {
            app_message: {
              card_message: {
                choices: [],
                description: 'description',
                height: 'UNSPECIFIED_HEIGHT',
                media_message: {
                  url: 'url',
                },
                title: 'title',
              },
              explicit_channel_message: {},
              explicit_channel_omni_message: {
                property1: {
                  card_message: {},
                },
                property2: {
                  text_message: {
                    text: 'text message',
                  },
                },
              },
              agent: {
                display_name: 'agent_name',
                type: 'UNKNOWN_AGENT_TYPE',
                picture_url: 'picture_url',
              },
            },
            accept_time: new Date('2019-08-24T14:15:22Z'),
            channel_identity: {
              identity: 'identity',
              channel: 'WHATSAPP',
              app_id: 'app_id',
            },
            contact_id: 'contact_id',
            conversation_id: 'conversation_id',
            direction: 'UNDEFINED_DIRECTION',
            id: 'message_id',
            metadata: 'metadata',
            injected: true,
            sender_id: 'sender_id',
            processing_mode: 'CONVERSATION',
          },
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listRecent.mockResolvedValue(expectedResponse);
      conversationApi.listRecent = fixture.listRecent;
      const response = await conversationApi.listRecent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listRecent).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('stopActiveConversation', () => {
    it('should make a POST request to stop the referenced conversation', async () => {
      // Given
      const requestData: StopActiveConversationRequestData = {
        conversation_id: 'conversation_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.stopActive.mockResolvedValue(expectedResponse);
      conversationApi.stopActive = fixture.stopActive;
      const response = await conversationApi.stopActive(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.stopActive).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateConversation', () => {
    it('should make a PATCH request to update a conversation', async () => {
      // Given
      const requestData: UpdateConversationRequestData = {
        conversation_id: 'conversation_id',
        metadata_update_strategy: 'REPLACE',
        updateConversationRequestBody: {
          app_id: 'app_id',
          metadata: 'Some metadata',
          metadata_json: {
            whatever: 'whatever',
            number: 0,
          },
        },
      };
      const expectedResponse: Conversation = {
        id: 'conversation_id',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      conversationApi.update = fixture.update;
      const response = await conversationApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
