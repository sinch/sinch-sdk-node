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

  describe ('injectMessage', () => {
    it('should make a POST request to inject a conversation message in to a specific conversation', async () => {
      // Given
      const requestData: InjectMessageRequestData = {
        conversation_id: 'conversation_id',
        injectMessageRequestBody: {
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
      fixture.list.mockResolvedValue(expectedResponse);
      conversationApi.list = fixture.list;
      const response = await conversationApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
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
