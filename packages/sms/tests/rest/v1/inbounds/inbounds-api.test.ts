import { SinchClientParameters } from '@sinch/sdk-client';
import {
  InboundsApi,
  InboundsApiFixture,
  Sms,
} from '../../../../src';

describe('InboundsApi', () => {
  let inboundsApi: InboundsApi;
  let fixture: InboundsApiFixture;
  let paramsWithServicePlanId: SinchClientParameters;

  beforeEach(() => {
    fixture = new InboundsApiFixture();
    paramsWithServicePlanId = {
      servicePlanId: 'SERVICE_PLAN_ID',
      apiToken: 'API_TOKEN',
    };
    inboundsApi = new InboundsApi(paramsWithServicePlanId);
  });

  describe ('listInboundMessages', () => {
    it('should make a GET request to list the inbound messages', async () => {
      // Given
      const requestData: Sms.ListInboundMessagesRequestData = {};
      const mockData: Sms.InboundMessageResponse[] = [
        {
          id: '01HEWZK16ENY7SZF7A2YBYGZDP',
          from: '17818510001',
          to: '33444555666',
          body: 'A message body',
          received_at: new Date('2023-11-16T12:34:56.789Z'),
          sent_at: new Date('2023-11-16T12:33:56.789Z'),
          type: 'mo_text',
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
      inboundsApi.list = fixture.list;
      const response = await inboundsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('retrieveInboundMessage', () => {
    it('should make a GET request to retrieve an inbound message by its ID (mo_text)', async () => {
      // Given
      const requestData: Sms.GetInboundMessageRequestData = {
        inbound_id: '01HEWZK16ENY7SZF7A2YBYGZDP',
      };
      const expectedResponse: Sms.InboundMessageResponse = {
        id: '01HEWZK16ENY7SZF7A2YBYGZDP',
        from: '17818510001',
        to: '33444555666',
        body: 'A message body',
        received_at: new Date('2023-11-16T12:34:56.789Z'),
        sent_at: new Date('2023-11-16T12:33:56.789Z'),
        type: 'mo_text',
        client_reference: 'client_reference_value',
        operator_id: 'operator_id_value',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      inboundsApi.get = fixture.get;
      const response = await inboundsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });

    it('should make a GET request to retrieve an inbound message by its ID (mo_binary)', async () => {
      // Given
      const requestData: Sms.GetInboundMessageRequestData = {
        inbound_id: '01HEWZK16ENY7SZF7A2YBYGZDP',
      };
      const expectedResponse: Sms.InboundMessageResponse = {
        id: '01HEWZK16ENY7SZF7A2YBYGZDP',
        from: '17818510001',
        to: '33444555666',
        body: 'VGhpcyBpcyB0aGUgU01TIGJvZHk=',
        udh: '5573657244617461486561646572',
        received_at: new Date('2023-11-16T12:34:56.789Z'),
        sent_at: new Date('2023-11-16T12:33:56.789Z'),
        type: 'mo_binary',
        client_reference: 'client_reference_value',
        operator_id: 'operator_id_value',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      inboundsApi.get = fixture.get;
      const response = await inboundsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });

    it('should make a GET request to retrieve an inbound message by its ID (mo_media)', async () => {
      // Given
      const requestData: Sms.GetInboundMessageRequestData = {
        inbound_id: '01HEWZK16ENY7SZF7A2YBYGZDP',
      };
      const expectedResponse: Sms.InboundMessageResponse = {
        id: '01HEWZK16ENY7SZF7A2YBYGZDP',
        from: '17818510001',
        to: '33444555666',
        body: {
          message: 'A message body',
          subject: 'A message subject',
          media: [
            {
              code: 0,
              content_type: 'image/jpeg',
              status: 'Uploaded',
              url: 'https://example.com/follow-the-white-rabbit.jpg',
            },
          ],
        },
        received_at: new Date('2023-11-16T12:34:56.789Z'),
        sent_at: new Date('2023-11-16T12:33:56.789Z'),
        type: 'mo_media',
        client_reference: 'client_reference_value',
        operator_id: 'operator_id_value',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      inboundsApi.get = fixture.get;
      const response = await inboundsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });
});
