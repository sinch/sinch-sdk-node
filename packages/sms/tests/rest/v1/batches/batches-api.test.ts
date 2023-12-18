import { SinchClientParameters, textToHex } from '@sinch/sdk-client';
import {
  ApiBatchListBatchesInner,
  ApiUpdateTextMtMessage,
  BatchesApi,
  BatchesApiFixture,
  BinaryRequest,
  CancelBatchMessageRequestData,
  DeliveryFeedbackRequestData,
  DryRunResponse,
  GetBatchMessageRequestData,
  ListBatchesRequestData,
  ReplaceBatchMessageRequestData,
  DryRunRequestData,
  SendSMSRequestData,
  SendSMSResponse,
  TextRequest,
  UpdateBatchMessageRequestData,
} from '../../../../src';

describe('BatchesApi', () => {
  let batchesApi: BatchesApi;
  let fixture: BatchesApiFixture;
  let paramsWithServicePlanId: SinchClientParameters;

  beforeEach(() => {
    fixture = new BatchesApiFixture();
    paramsWithServicePlanId = {
      servicePlanId: 'SERVICE_PLAN_ID',
      apiToken: 'API_TOKEN',
    };
    batchesApi = new BatchesApi(paramsWithServicePlanId);
  });

  describe ('cancelBatchMessage', () => {
    it('should make a DELETE request to cancel a batch', async () => {
      // Given
      const requestData: CancelBatchMessageRequestData = {
        batch_id: '01HF4WG1TAVS351YYD7Q84K8HA',
      };
      const expectedResponse: SendSMSResponse = {
        id: '01HF4WG1TAVS351YYD7Q84K8HA',
        to: [
          '33444555666',
        ],
        from: '17818510001',
        canceled: true,
        body: 'A message body',
        type: 'mt_text',
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:36:56.789Z'),
        delivery_report: 'none',
        send_at: new Date('2023-11-20T12:34:56.789Z'),
        expire_at: new Date('2023-11-23T12:34:56.789Z'),
        flash_message: false,
      };

      // When
      fixture.cancel.mockResolvedValue(expectedResponse);
      batchesApi.cancel = fixture.cancel;
      const response = await batchesApi.cancel(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.cancel).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deliveryFeedback', () => {
    it('should make a POST request to send a delivery feedback of a message', async () => {
      // Given
      const requestData: DeliveryFeedbackRequestData = {
        batch_id: '01HF4WG1TAVS351YYD7Q84K8HA',
        deliveryFeedbackRequestBody: {
          recipients: [
            '+33444555666',
          ],
        },
      };
      const expectedResponse: void = undefined;

      // When
      fixture.sendDeliveryFeedback.mockResolvedValue(expectedResponse);
      batchesApi.sendDeliveryFeedback = fixture.sendDeliveryFeedback;
      const response = await batchesApi.sendDeliveryFeedback(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.sendDeliveryFeedback).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('run', () => {
    it('should make a POST request to perform a dry run of a batch', async () => {
      // Given
      const requestData: DryRunRequestData = {
        dryRunRequestBody: {
          from: '+17818510001',
          to: [
            '+33444555666',
          ],
          body: 'A message body',
          delivery_report: 'none',
          type: 'mt_text',
        },
      };
      const expectedResponse: DryRunResponse = {
        number_of_messages: 1,
        number_of_recipients: 1,
      };

      // When
      fixture.dryRun.mockResolvedValue(expectedResponse);
      batchesApi.dryRun = fixture.dryRun;
      const response = await batchesApi.dryRun(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.dryRun).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getBatchMessage', () => {
    it('should make a GET request to retrieve a batch by its ID', async () => {
      // Given
      const requestData: GetBatchMessageRequestData = {
        batch_id: '01HF4WG1TAVS351YYD7Q84K8HA',
      };
      const expectedResponse: SendSMSResponse = {
        id: '01HF4WG1TAVS351YYD7Q84K8HA',
        to: [
          '33444555666',
        ],
        from: '17818510001',
        canceled: false,
        body: 'A message body',
        type: 'mt_text',
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:36:56.789Z'),
        delivery_report: 'none',
        send_at: new Date('2023-11-20T12:34:56.789Z'),
        expire_at: new Date('2023-11-23T12:34:56.789Z'),
        flash_message: false,
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      batchesApi.get = fixture.get;
      const response = await batchesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listBatches', () => {
    it('should make a GET request to list the existing batches', async () => {
      // Given
      const requestData: ListBatchesRequestData = {};
      const mockData: ApiBatchListBatchesInner[] = [
        {
          id: '01HF28S9AAGRKWP2CY92BJB569',
          to: [
            '33444555666',
          ],
          from: '17818510001',
          canceled: false,
          parameters: {
            name: {
              '+33444555666': 'Bob',
              default: 'there',
            },
          },
          body: 'Test message: hi ${name}!',
          type: 'mt_text',
          created_at: new Date('2023-11-16T12:34:56.789Z'),
          modified_at: new Date('2023-11-16T12:36:56.789Z'),
          delivery_report: 'none',
          send_at: new Date('2023-11-20T12:34:56.789Z'),
          expire_at: new Date('2023-11-23T12:34:56.789Z'),
          flash_message: false,
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
      batchesApi.list = fixture.list;
      const response = await batchesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('replaceBatch', () => {
    it('should make a PUT request to replace the parameters of a batch', async () => {
      // Given
      const requestData: ReplaceBatchMessageRequestData = {
        batch_id: '01HF4WG1TAVS351YYD7Q84K8HA',
        replaceBatchMessageRequestBody: {
          from: '+17818510001',
          to: [
            '+33444555666',
          ],
          udh: textToHex('UserDataHeader'),
          body: btoa('This is an replaced message'),
          delivery_report: 'none',
          type: 'mt_binary',
          client_reference: 'Sinch Node.js SDK',
        } as BinaryRequest,
      };
      const expectedResponse: SendSMSResponse = {
        id: '01HF4WG1TAVS351YYD7Q84K8HA',
        to: [
          '33444555666',
        ],
        from: '17818510001',
        canceled: false,
        body: 'A message body',
        type: 'mt_binary',
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:36:56.789Z'),
        delivery_report: 'none',
        client_reference: 'Sinch Node.js SDK',
        send_at: new Date('2023-11-20T12:34:56.789Z'),
        expire_at: new Date('2023-11-23T12:34:56.789Z'),
        flash_message: false,
        udh: textToHex('UserDataHeader'),
      };

      // When
      fixture.replace.mockResolvedValue(expectedResponse);
      batchesApi.replace = fixture.replace;
      const response = await batchesApi.replace(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.replace).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('sendSMS', () => {
    it('should make a POST request to send a message', async () => {
      // Given
      const requestData: SendSMSRequestData = {
        sendSMSRequestBody: {
          to: [
            '+33444555666',
          ],
          from: '+17818510001',
          parameters: {
            name: {
              '+33612814258': 'Bob',
              default: 'there',
            },
          },
          body: 'Hi ${name}!',
          delivery_report: 'none',
          type: 'mt_text',
          send_at: new Date('2023-11-20T12:34:56.789Z'),
        } as TextRequest,
      };
      const expectedResponse: SendSMSResponse = {
        id: '01HF4WG1TAVS351YYD7Q84K8HA',
        to: [
          '33444555666',
        ],
        from: '17818510001',
        canceled: false,
        parameters: {
          name: {
            '+33444555666': 'Bob',
            default: 'there',
          },
        },
        body: 'Hi ${name}!',
        type: 'mt_text',
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:34:56.789Z'),
        delivery_report: 'none',
        send_at: new Date('2023-11-20T12:34:56.789Z'),
        expire_at: new Date('2023-11-23T12:34:56.789Z'),
        flash_message: false,
      };

      // When
      fixture.send.mockResolvedValue(expectedResponse);
      batchesApi.send = fixture.send;
      const response = await batchesApi.send(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.send).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateBatchMessage', () => {
    it('should make a POST request to update all specified parameters of a batch', async () => {
      // Given
      const requestData: UpdateBatchMessageRequestData = {
        batch_id: '01HF4WG1TAVS351YYD7Q84K8HA',
        updateBatchMessageRequestBody: {
          from: '+17818510001',
          parameters: {
            name: {
              '+33444555666': 'Robert',
              default: 'friend',
            },
          },
          body: 'Hi ${name}! This is an updated message',
          delivery_report: 'none',
          type: 'mt_text',
        } as ApiUpdateTextMtMessage,
      };
      const expectedResponse: SendSMSResponse = {
        id: '01HF4WG1TAVS351YYD7Q84K8HA',
        to: [
          '33444555666',
        ],
        from: '17818510001',
        canceled: false,
        parameters: {
          name: {
            '+33612814258': 'Robert',
            default: 'friend',
          },
        },
        body: 'Hi ${name}! This is an updated message',
        type: 'mt_text',
        created_at: new Date('2023-11-16T12:34:56.789Z'),
        modified_at: new Date('2023-11-16T12:36:56.789Z'),
        delivery_report: 'none',
        send_at: new Date('2023-11-20T12:34:56.789Z'),
        expire_at: new Date('2023-11-23T12:34:56.789Z'),
        flash_message: false,
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      batchesApi.update = fixture.update;
      const response = await batchesApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
