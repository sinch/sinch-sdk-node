import { SinchClientParameters } from '@sinch/sdk-client';
import { GenericEvent, SendEventRequestData, SendEventResponse } from '../../../../src';
import { EventsApi, EventsApiFixture } from '../../../../src';

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
      fixture.sendEvent.mockResolvedValue(expectedResponse);
      eventsApi.sendEvent = fixture.sendEvent;
      const response = await eventsApi.sendEvent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.sendEvent).toHaveBeenCalledWith(requestData);
    });
  });
});
