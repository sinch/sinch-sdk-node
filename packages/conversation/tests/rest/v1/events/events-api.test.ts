import { SinchClientParameters } from '@sinch/sdk-client';
import {
  EventsApi,
  EventsApiFixture,
  Conversation,
} from '../../../../src';
import { recipientChannelIdentities, recipientContactId } from '../mocks';
import {
  agentJoinedEvent,
  agentLeftEvent,
  commentReplyEvent,
  composingEndEvent,
  composingEvent,
  genericEvent,
} from '../../../events-mocks';

describe('EventsApi', () => {
  let eventsApi: EventsApi;
  let fixture: EventsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new EventsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    eventsApi = new EventsApi(credentials);
  });

  describe ('deleteEvents', () => {
    it('should make a DELETE request to delete a specific event by its ID', async () => {
      // Given
      const requestData: Conversation.DeleteEventRequestData = {
        event_id: 'event_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      eventsApi.delete = fixture.delete;
      const response = await eventsApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getEvent', () => {
    it('should make a GET request to retrieve an event from its ID', async () => {
      // Given
      const requestData: Conversation.GetEventRequestData = {
        event_id: 'event_id',
      };
      const expectedResponse: Conversation.ConversationEvent = {
        id: 'event_id',
        channel_identity: {
          identity: 'identity',
          app_id: 'app_id',
          channel: 'WHATSAPP',
        },
        processing_mode: 'CONVERSATION',
        direction: 'TO_APP',
        app_event: {
          composing_event: {},
        },
        contact_id: 'contact_id',
        conversation_id: 'conversation_id',
        accept_time: new Date('2019-08-24T14:15:22Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      eventsApi.get = fixture.get;
      const response = await eventsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listEvents', () => {
    it('should make a GET request to list all events in a project', async () => {
      // Given
      const requestData: Conversation.ListEventsRequestData = {
        contact_id: 'contact_id',
        conversation_id: 'conversation_id',
      };
      const mockData: Conversation.ConversationEvent[] = [
        {
          id: 'app_event_id',
          channel_identity: {
            identity: 'identity',
            app_id: 'app_id',
            channel: 'WHATSAPP',
          },
          processing_mode: 'CONVERSATION',
          direction: 'TO_CONTACT',
          app_event: {
            composing_event: {},
          },
          contact_id: 'contact_id',
          conversation_id: 'conversation_id',
          accept_time: new Date('2019-08-24T14:15:22Z'),
        },
        {
          id: 'contact_event_id',
          channel_identity: {
            identity: 'identity',
            app_id: 'app_id',
            channel: 'WHATSAPP',
          },
          processing_mode: 'CONVERSATION',
          direction: 'TO_APP',
          contact_event: {
            conversation_deleted_event: {},
          },
          contact_id: 'contact_id',
          conversation_id: 'conversation_id',
          accept_time: new Date('2019-08-24T14:15:22Z'),
        },
        {
          id: 'contact_message_event_id',
          channel_identity: {
            identity: 'identity',
            app_id: 'app_id',
            channel: 'WHATSAPP',
          },
          processing_mode: 'CONVERSATION',
          direction: 'TO_APP',
          contact_message_event: {
            payment_status_update_event: {
              payment_status: 'PAYMENT_STATUS_CAPTURED',
              payment_transaction_status: 'PAYMENT_STATUS_TRANSACTION_SUCCESS',
              payment_transaction_id: 'transaction_id',
              reference_id: 'reference_id',
            },
          },
          contact_id: 'contact_id',
          conversation_id: 'conversation_id',
          accept_time: new Date('2019-08-24T14:15:22Z'),
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
      eventsApi.list = fixture.list;
      const response = await eventsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('send', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...composingEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send any event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.send.mockResolvedValue(expectedResponse);
        eventsApi.send = fixture.send;
        const response = await eventsApi.send(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.send).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendComposingEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendComposingEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...composingEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendComposingEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendComposingEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send a composing event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendComposingEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendComposingEvent = fixture.sendComposingEvent;
        const response = await eventsApi.sendComposingEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendComposingEvent).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendComposingEndEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendComposingEndEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...composingEndEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendComposingEndEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendComposingEndEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send a composing end event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendComposingEndEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendComposingEndEvent = fixture.sendComposingEndEvent;
        const response = await eventsApi.sendComposingEndEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendComposingEndEvent).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendCommentReplyEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendCommentReplyEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...commentReplyEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendCommentReplyEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendCommentReplyEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send a comment reply event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendCommentReplyEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendCommentReplyEvent = fixture.sendCommentReplyEvent;
        const response = await eventsApi.sendCommentReplyEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendCommentReplyEvent).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendAgentJoinedEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendAgentJoinedEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...agentJoinedEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendAgentJoinedEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendAgentJoinedEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send an agent joined event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendAgentJoinedEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendAgentJoinedEvent = fixture.sendAgentJoinedEvent;
        const response = await eventsApi.sendAgentJoinedEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendAgentJoinedEvent).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendAgentLeftEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendAgentLeftEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...agentLeftEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendAgentLeftEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendAgentLeftEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send an agent left event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendAgentLeftEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendAgentLeftEvent = fixture.sendAgentLeftEvent;
        const response = await eventsApi.sendAgentLeftEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendAgentLeftEvent).toHaveBeenCalledWith(requestData);
      });
  });

  describe ('sendGenericEvent', () => {
    // Given
    const sendEventRequest: Omit<Conversation.SendGenericEventRequest<Conversation.Recipient>, 'recipient'> = {
      app_id: 'app_id',
      event: {
        ...genericEvent,
      },
    };
    const requestDataWithContactId: Conversation.SendGenericEventRequestData<Conversation.ContactId> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientContactId,
      },
    };
    const requestDataWithChannelIdentity: Conversation.SendGenericEventRequestData<Conversation.IdentifiedBy> = {
      sendEventRequestBody: {
        ...sendEventRequest,
        ...recipientChannelIdentities,
      },
    };
    const expectedResponse: Conversation.SendEventResponse = {
      accepted_time: new Date('2019-08-24T14:15:22Z'),
      event_id: 'event_id',
    };

    test.each([
      ['contact ID', requestDataWithContactId, expectedResponse],
      ['channel identities', requestDataWithChannelIdentity, expectedResponse],
    ])('should make a POST request to send a generic event to a recipient identified by its %s',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_identification, requestData, expectedResponse) => {
        // When
        fixture.sendGenericEvent.mockResolvedValue(expectedResponse);
        eventsApi.sendGenericEvent = fixture.sendGenericEvent;
        const response = await eventsApi.sendGenericEvent(requestData);

        // Then
        expect(response).toEqual(expectedResponse);
        expect(fixture.sendGenericEvent).toHaveBeenCalledWith(requestData);
      });
  });
});
