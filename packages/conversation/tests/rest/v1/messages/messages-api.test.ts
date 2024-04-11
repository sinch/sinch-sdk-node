import { SinchClientParameters } from '@sinch/sdk-client';
import {
  messageBuilder,
  MessagesApi,
  MessagesApiFixture,
  Conversation,
} from '../../../../src';
import { recipientChannelIdentities, recipientContactId } from '../mocks';
import {
  cardMessageItem,
  carouselMessageItem,
  choiceMessageItem,
  contactInfoMessageItem,
  listMessageItem,
  locationMessageItem,
  mediaMessageItem,
  templateMessageItem,
  textMessageItem,
} from '../../../messages-mocks';

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
      const requestData: Conversation.DeleteMessageRequestData = {
        message_id: 'message_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      messagesApi.delete = fixture.delete;
      const response = await messagesApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getMessage', () => {
    it('should make a GET request to retrieve a specific message by its ID', async () => {
      // Given
      const requestData: Conversation.GetMessageRequestData = {
        message_id: 'message_id',
      };
      const expectedResponse: Conversation.ConversationMessage = {
        accept_time: new Date('2019-08-24T14:15:22Z'),
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
        },
        channel_identity: {
          app_id: 'app_id',
          channel: 'WHATSAPP',
          identity: 'identity',
        },
        contact_id: 'contact_id',
        conversation_id: 'conversation_id',
        direction: 'UNDEFINED_DIRECTION',
        id: 'id',
        metadata: 'metadata',
        injected: true,
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      messagesApi.get = fixture.get;
      const response = await messagesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listMessages', () => {
    it('should make a GET request to list all the messages sent or received', async () => {
      // Given
      const requestData: Conversation.ListMessagesRequestData = {};
      const mockData: Conversation.ConversationMessage[] = [
        {
          accept_time: new Date('2019-08-24T14:15:22Z'),
          app_message: {
            card_message: {
              choices: [
                {
                  call_message: {
                    title: 'title',
                    phone_number: 'number',
                  },
                  postback_data: 'data',
                },
              ],
              description: 'description',
              height: 'UNSPECIFIED_HEIGHT',
              media_message: {
                url: 'url',
              },
              title: 'title',
            },
            explicit_channel_message: {},
          },
          channel_identity: {
            identity: 'identity',
            app_id: 'app_id',
            channel: 'WHATSAPP',
          },
          contact_id: 'contact_id',
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
      fixture.list.mockResolvedValue(expectedResponse);
      messagesApi.list = fixture.list;
      const response = await messagesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('sendMessage', () => {
    // Given
    const sendMessageRequest: Omit<Conversation.SendMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.text(textMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send any message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.send.mockResolvedValue(expectedResponse);
        messagesApi.send = fixture.send;
        const response = await messagesApi.send(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.send).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendCardMessage', () => {
    // Given
    const sendCardMessageRequest: Omit<Conversation.SendCardMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.card(cardMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendCardMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendCardMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendCardMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendCardMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a card message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendCardMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendCardMessage = fixture.sendCardMessage;
        const response = await messagesApi.sendCardMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendCardMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendCarouselMessage', () => {
    // eslint-disable-next-line max-len
    const sendCarouselMessageRequest: Omit<Conversation.SendCarouselMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.carousel(carouselMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendCarouselMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendCarouselMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendCarouselMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendCarouselMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a carousel message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendCarouselMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendCarouselMessage = fixture.sendCarouselMessage;
        const response = await messagesApi.sendCarouselMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendCarouselMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendChoiceMessage', () => {
    const sendChoiceMessageRequest: Omit<Conversation.SendChoiceMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.choice(choiceMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendChoiceMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendChoiceMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendChoiceMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendChoiceMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a choice message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendChoiceMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendChoiceMessage = fixture.sendChoiceMessage;
        const response = await messagesApi.sendChoiceMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendChoiceMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendContactInfoMessage', () => {
    // eslint-disable-next-line max-len
    const sendContactInfoMessageRequest: Omit<Conversation.SendContactInfoMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.contactInfo(contactInfoMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendContactInfoMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendContactInfoMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendContactInfoMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendContactInfoMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a contact info message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendContactInfoMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendContactInfoMessage = fixture.sendContactInfoMessage;
        const response = await messagesApi.sendContactInfoMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendContactInfoMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendListMessage', () => {
    const sendListMessageRequest: Omit<Conversation.SendListMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.list(listMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendListMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendListMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendListMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendListMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a list message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendListMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendListMessage = fixture.sendListMessage;
        const response = await messagesApi.sendListMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendListMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendLocationMessage', () => {
    // eslint-disable-next-line max-len
    const sendLocationMessageRequest: Omit<Conversation.SendLocationMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.location(locationMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendLocationMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendLocationMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendLocationMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendLocationMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a location message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendLocationMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendLocationMessage = fixture.sendLocationMessage;
        const response = await messagesApi.sendLocationMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendLocationMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendMediaMessage', () => {
    const sendMediaMessageRequest: Omit<Conversation.SendMediaMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.media(mediaMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendMediaMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendMediaMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendMediaMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendMediaMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a media message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendMediaMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendMediaMessage = fixture.sendMediaMessage;
        const response = await messagesApi.sendMediaMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendMediaMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendTemplateMessage', () => {
    // eslint-disable-next-line max-len
    const sendTemplateMessageRequest: Omit<Conversation.SendTemplateMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.template(templateMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendTemplateMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendTemplateMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendTemplateMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendTemplateMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a template message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendTemplateMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendTemplateMessage = fixture.sendTemplateMessage;
        const response = await messagesApi.sendTemplateMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendTemplateMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendTextMessage', () => {
    const sendTextMessageRequest: Omit<Conversation.SendTextMessageRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      message: {
        ...messageBuilder.text(textMessageItem),
      },
    };
    const requestDataWithContactId: Conversation.SendTextMessageRequestData<Conversation.ContactId> = {
      sendMessageRequestBody: {
        ...sendTextMessageRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendTextMessageRequestData<Conversation.IdentifiedBy> = {
      sendMessageRequestBody: {
        ...sendTextMessageRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendMessageResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      message_id: 'message_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
      // eslint-disable-next-line max-len
    ])('should make a POST request to send a text message request from a conversation app to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
      // When
        fixture.sendTextMessage.mockResolvedValue(expectedResponse);
        messagesApi.sendTextMessage = fixture.sendTextMessage;
        const response = await messagesApi.sendTextMessage(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendTextMessage).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('updateMessageMetadata', () => {
    it('should make a PATCH request to update a message', async () => {
      // Given
      const requestData: Conversation.UpdateMessageRequestData = {
        message_id: 'message_id',
        messages_source: 'CONVERSATION_SOURCE',
        updateMessageRequestBody: {
          metadata: 'new_metadata',
        },
      };
      const expectedResponse: Conversation.ConversationMessage = {
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
            WHATSAPP: {
              card_message: {},
            },
            KAKAOTALK: {
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
        metadata: 'new_metadata',
        injected: true,
        sender_id: 'sender_id',
        processing_mode: 'CONVERSATION',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      messagesApi.update = fixture.update;
      const response = await messagesApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
