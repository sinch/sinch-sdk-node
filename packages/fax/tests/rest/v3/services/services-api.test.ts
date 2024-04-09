import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ServicesApi,
  ServicesApiFixture,
  Fax,
} from '../../../../src';

describe('ServicesApi', () => {
  let servicesApi: ServicesApi;
  let fixture: ServicesApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ServicesApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    servicesApi = new ServicesApi(credentials);
  });


  describe ('createService', () => {
    it('should make a POST request to create a new service', async () => {
      // Given
      const requestData: Fax.CreateServiceRequestData = {
        createServiceRequestBody: {
          name: 'New service',
          incomingWebhookUrl: 'https://yourserver/incomingFax',
          webhookContentType: 'multipart/form-data',
          defaultForProject: false,
          defaultFrom: '+15551235656',
          numberOfRetries: 3,
          retryDelaySeconds: 60,
          imageConversionMethod: 'HALFTONE',
          saveOutboundFaxDocuments: true,
          saveInboundFaxDocuments: true,
        },
      };
      const expectedResponse: Fax.ServiceResponse = {
        id: 'serviceId',
        name: 'New service',
        incomingWebhookUrl: 'https://yourserver/incomingFax',
        webhookContentType: 'multipart/form-data',
        defaultForProject: false,
        defaultFrom: '+15551235656',
        numberOfRetries: 3,
        retryDelaySeconds: 60,
        imageConversionMethod: 'HALFTONE',
        saveOutboundFaxDocuments: true,
        saveInboundFaxDocuments: true,
        projectId: 'projectId',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      servicesApi.create = fixture.create;
      const response = await servicesApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getService', () => {
    it('should make a GET request to retrieve  a service resource', async () => {
      // Given
      const requestData: Fax.GetServiceRequestData = {
        serviceId: 'serviceId',
      };
      const expectedResponse: Fax.ServiceResponse = {
        id: 'serviceId',
        name: 'New service',
        incomingWebhookUrl: 'https://yourserver/incomingFax',
        webhookContentType: 'multipart/form-data',
        defaultForProject: false,
        defaultFrom: '+15551235656',
        numberOfRetries: 3,
        retryDelaySeconds: 60,
        imageConversionMethod: 'HALFTONE',
        saveOutboundFaxDocuments: true,
        saveInboundFaxDocuments: true,
        projectId: 'projectId',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      servicesApi.get = fixture.get;
      const response = await servicesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listEmailsForNumber', () => {
    it('should make a GET request to list any emails for a number', async () => {
      // Given
      const requestData: Fax.ListEmailsForNumberRequestData = {
        serviceId: 'serviceId',
        phoneNumber: '+15551235656',
      };
      const mockData: string[] = [
        'user@example.com',
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listEmailsForNumber.mockResolvedValue(expectedResponse);
      servicesApi.listEmailsForNumber = fixture.listEmailsForNumber;
      const response = await servicesApi.listEmailsForNumber(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listEmailsForNumber).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listNumbersForService', () => {
    it('should make a GET request to list the numbers associated with a service', async () => {
      // Given
      const requestData: Fax.ListNumbersForServiceRequestData = {
        serviceId: 'serviceId',
        pageSize: 10,
        page: '0',
      };
      const mockData: Fax.ServicePhoneNumber[] = [
        {
          serviceId: 'serviceId',
          projectId: 'projectId',
          phoneNumber: '+15551235656',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listNumbers.mockResolvedValue(expectedResponse);
      servicesApi.listNumbers = fixture.listNumbers;
      const response = await servicesApi.listNumbers(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listNumbers).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listServices', () => {
    it('should make a GET request to list the services for a project', async () => {
      // Given
      const requestData: Fax.ListServicesRequestData = {
        pageSize: 10,
        page: '0',
      };
      const mockData: Fax.ServiceResponse[] = [
        {
          id: 'serviceId',
          name: 'New service',
          incomingWebhookUrl: 'https://yourserver/incomingFax',
          webhookContentType: 'multipart/form-data',
          defaultForProject: false,
          defaultFrom: '+15551235656',
          numberOfRetries: 3,
          retryDelaySeconds: 60,
          imageConversionMethod: 'HALFTONE',
          saveOutboundFaxDocuments: true,
          saveInboundFaxDocuments: true,
          projectId: 'projectId',
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
      servicesApi.list = fixture.list;
      const response = await servicesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('removeService', () => {
    it('should make a DELETE request to remove a service from a project', async () => {
      // Given
      const requestData: Fax.DeleteServiceRequestData = {
        serviceId: 'serviceId',
      };
      const expectedResponse: void = undefined;

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      servicesApi.delete = fixture.delete;
      const response = await servicesApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateService', () => {
    it('should make a PATCH request to update settings on a service', async () => {
      // Given
      const requestData: Fax.UpdateServiceRequestData = {
        serviceId: 'serviceId',
        updateServiceRequestBody: {
          name: 'Updated service',
          incomingWebhookUrl: 'https://your-new-server/incomingFax',
          webhookContentType: 'application/json',
          defaultForProject: true,
          defaultFrom: '+15551234567',
          numberOfRetries: 5,
          retryDelaySeconds: 30,
          imageConversionMethod: 'MONOCHROME',
          saveOutboundFaxDocuments: false,
          saveInboundFaxDocuments: false,
        },
      };
      const expectedResponse: Fax.ServiceResponse = {
        id: 'serviceId',
        name: 'Updated service',
        incomingWebhookUrl: 'https://your-new-server/incomingFax',
        webhookContentType: 'application/json',
        defaultForProject: true,
        defaultFrom: '+15551234567',
        numberOfRetries: 5,
        retryDelaySeconds: 30,
        imageConversionMethod: 'MONOCHROME',
        saveOutboundFaxDocuments: false,
        saveInboundFaxDocuments: false,
        projectId: 'projectId',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      servicesApi.update = fixture.update;
      const response = await servicesApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
