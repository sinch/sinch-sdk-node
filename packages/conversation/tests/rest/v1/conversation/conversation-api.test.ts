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
      fixture.createConversation.mockResolvedValue(expectedResponse);
      conversationApi.createConversation = fixture.createConversation;
      const response = await conversationApi.createConversation(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.createConversation).toHaveBeenCalledWith(requestData);
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
      fixture.deleteConversation.mockResolvedValue(expectedResponse);
      conversationApi.deleteConversation = fixture.deleteConversation;
      const response = await conversationApi.deleteConversation(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.deleteConversation).toHaveBeenCalledWith(requestData);
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
      fixture.getConversation.mockResolvedValue(expectedResponse);
      conversationApi.getConversation = fixture.getConversation;
      const response = await conversationApi.getConversation(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getConversation).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('injectMessage', () => {
    it('should make a POST request to inject a conversation message in to a specific conversation', async () => {
      // Given
      const requestData: InjectMessageRequestData = {
        'message.conversation_id': 'conversation_id',
        conversationMessageInjectedBody: {
          app_message: {
            message: {
              card_message: {
                choices: [],
                title: 'title',
                description: 'description',
              },
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
      fixture.listConversations.mockResolvedValue(expectedResponse);
      conversationApi.listConversations = fixture.listConversations;
      const response = await conversationApi.listConversations(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listConversations).toHaveBeenCalledWith(requestData);
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
      fixture.stopActiveConversation.mockResolvedValue(expectedResponse);
      conversationApi.stopActiveConversation = fixture.stopActiveConversation;
      const response = await conversationApi.stopActiveConversation(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.stopActiveConversation).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateConversation', () => {
    it('should make a PATCH request to update a conversation', async () => {
      // Given
      const requestData: UpdateConversationRequestData = {
        conversation_id: 'conversation_id',
        metadata_update_strategy: 'REPLACE',
        conversationBody: {
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
      fixture.updateConversation.mockResolvedValue(expectedResponse);
      conversationApi.updateConversation = fixture.updateConversation;
      const response = await conversationApi.updateConversation(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.updateConversation).toHaveBeenCalledWith(requestData);
    });
  });
});
