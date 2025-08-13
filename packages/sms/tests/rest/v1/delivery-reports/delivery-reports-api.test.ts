import { SinchClientParameters } from '@sinch/sdk-client';
import {
  DeliveryReportsApi,
  DeliveryReportsApiFixture,
  Sms,
} from '../../../../src';

describe('DeliveryReportsApi', () => {
  let deliveryReportsApi: DeliveryReportsApi;
  let fixture: DeliveryReportsApiFixture;
  let paramsWithServicePlanId: SinchClientParameters;

  beforeEach(() => {
    fixture = new DeliveryReportsApiFixture();
    paramsWithServicePlanId = {
      servicePlanId: 'SERVICE_PLAN_ID',
      apiToken: 'API_TOKEN',
    };
    deliveryReportsApi = new DeliveryReportsApi(paramsWithServicePlanId);
  });

  describe ('getDeliveryReportByBatchId', () => {
    it('should make a GET request to retrieve a delivery report by its ID', async () => {
      // Given
      const requestData: Sms.GetDeliveryReportByBatchIdRequestData = {
        batch_id: '01HF28S9AAGRKWP2CY92BJB569',
        code: 402,
        status: 'Failed',
        type: 'full',
      };
      const expectedResponse: Sms.DeliveryReport = {
        batch_id: '01HF28S9AAGRKWP2CY92BJB569',
        statuses: [
          {
            code: 402,
            count: 1,
            recipients: [
              '33444555666',
            ],
            status: 'Failed',
          },
        ],
        type: 'delivery_report_sms',
        total_message_count: 1,
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      deliveryReportsApi.get = fixture.get;
      const response = await deliveryReportsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getDeliveryReportByPhoneNumber', () => {
    it('should make a GET request to retrieve a delivery report by its ID '
      + 'and filter for a specific phone number', async () => {
      // Given
      const requestData: Sms.GetDeliveryReportByPhoneNumberRequestData = {
        batch_id: '01HF28S9AAGRKWP2CY92BJB569',
        phone_number: '+33444555666',
      };
      const expectedResponse: Sms.RecipientDeliveryReport = {
        batch_id: '01HF28S9AAGRKWP2CY92BJB569',
        code: 400,
        at: new Date('2023-11-12T17:20:00Z'),
        recipient: '33444555666',
        status: 'Failed',
        type: 'recipient_delivery_report_sms',
      };

      // When
      fixture.getForNumber.mockResolvedValue(expectedResponse);
      deliveryReportsApi.getForNumber = fixture.getForNumber;
      const response = await deliveryReportsApi.getForNumber(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getForNumber).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getDeliveryReports', () => {
    it('should make a GET request to list the delivery reports', async () => {
      // Given
      const requestData: Sms.ListDeliveryReportsRequestData = {
        code: [401, 402],
        status: ['Failed', 'Cancelled'],
        start_date: new Date('2023-11-12T00:00:00Z'),
        end_date: new Date('2023-11-19T23:59:59.999Z'),
        client_reference: 'my-client-reference',
      };
      const mockData: Sms.RecipientDeliveryReport[] = [
        {
          batch_id: '01HF28S9AAGRKWP2CY92BJB569',
          code: 401,
          at: new Date('2023-11-12T17:20:00Z'),
          recipient: '33444555666',
          status: 'Failed',
          type: 'recipient_delivery_report_sms',
          client_reference: 'my-client-reference',
          applied_originator: 'Sinch',
          encoding: 'GSM',
          number_of_message_parts: 1,
          operator: 'Sinch',
          operator_status_at: new Date('2023-11-12T17:20:00Z'),
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
      deliveryReportsApi.list = fixture.list;
      const response = await deliveryReportsApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });
});
