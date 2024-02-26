import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ConversationEvent,
  DeleteEventRequestData,
  EventsApi,
  EventsApiFixture,
  GenericEvent,
  GetEventRequestData,
  ListEventsRequestData,
  SendEventRequestData,
  SendEventResponse,
} from '../../../../src';

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
      const requestData: DeleteEventRequestData = {
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
      const requestData: GetEventRequestData = {
        event_id: 'event_id',
      };
      const expectedResponse: ConversationEvent = {
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
      const requestData: ListEventsRequestData = {
        contact_id: 'contact_id',
        conversation_id: 'conversation_id',
      };
      const mockData: ConversationEvent[] = [
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

  describe ('sendEvent', () => {
    it('should make a POST request to send an event to the referenced contact from the referenced app', async () => {
      // Given
      const requestData: SendEventRequestData = {
        sendEventRequestBody: {
          app_id: 'app_id',
          recipient: {
            contact_id: 'contact_id',
          },
          event: {
            generic_event: {
              payload: {
                some: 'data',
              },
            },
          } as GenericEvent,
        },
      };
      const expectedResponse: SendEventResponse = {
        accepted_time: new Date('2019-08-24T14:15:22Z'),
        event_id: 'event_id',
      };

      // When
      fixture.send.mockResolvedValue(expectedResponse);
      eventsApi.send = fixture.send;
      const response = await eventsApi.send(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.send).toHaveBeenCalledWith(requestData);
    });
  });
});
