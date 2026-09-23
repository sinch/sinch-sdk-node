import { resolveClientParameters } from '@sinch/sdk-client';
import {
  LazyVoiceV2ApiClient,
  Voice,
  VoiceV2ServicesApi,
  VoiceV2ServicesApiFixture,
} from '../../../../src';

describe('VoiceV2ServicesApi', () => {
  let servicesApi: VoiceV2ServicesApi;
  let fixture: VoiceV2ServicesApiFixture;

  beforeEach(() => {
    fixture = new VoiceV2ServicesApiFixture();
    const lazyClient = new LazyVoiceV2ApiClient(resolveClientParameters({
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    }));
    servicesApi = new VoiceV2ServicesApi(lazyClient);
  });

  describe('list', () => {
    it('should make a GET request to list voice services', async () => {
      // Given
      const requestData: Voice.v2.ListServicesRequestData = {
        filter: 'Primary',
        isDefault: true,
        pageSize: 20,
        page: 1,
      };
      const mockData: Voice.v2.ServiceShortResponse[] = [
        {
          serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
          projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
          createTime: new Date('2025-01-01T00:00:00Z'),
          name: 'Primary Service',
          description: 'Main service with webhook call behavior',
          isDefault: true,
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

  describe('create', () => {
    it('should make a POST request to create a voice service', async () => {
      // Given
      const requestData: Voice.v2.CreateServiceRequestData = {
        'Idempotency-Key': '01ARZ3NDEKTSV4RRFFQ69G5FAA',
        createServiceRequestBody: {
          name: 'Example service',
          description: 'Service with webhooks',
          callBehavior: {
            type: 'WEBHOOK',
            webhook: {
              url: 'https://example.com/webhook',
              fallbackUrl: 'https://example.com/fallback',
            },
          },
        },
      };
      const expectedResponse: Voice.v2.ServiceResponse = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        createTime: new Date('2025-01-01T00:00:00Z'),
        name: 'Example service',
        description: 'Service with webhooks',
        isDefault: false,
        callBehavior: {
          type: 'WEBHOOK',
          webhook: {
            url: 'https://example.com/webhook',
            fallbackUrl: 'https://example.com/fallback',
          },
        },
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

  describe('get', () => {
    it('should make a GET request to retrieve a voice service by ID', async () => {
      // Given
      const requestData: Voice.v2.GetServiceRequestData = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
      };
      const expectedResponse: Voice.v2.ServiceResponse = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        createTime: new Date('2025-01-01T00:00:00Z'),
        updateTime: new Date('2025-06-01T09:15:00Z'),
        name: 'My Voice Service',
        description: 'Service with webhook call behavior',
        isDefault: true,
        callBehavior: {
          type: 'WEBHOOK',
          webhook: {
            url: 'https://example.com/webhook',
            fallbackUrl: 'https://example.com/fallback',
          },
        },
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

  describe('update', () => {
    it('should make a PATCH request to update a voice service', async () => {
      // Given
      const requestData: Voice.v2.UpdateServiceRequestData = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        'Idempotency-Key': '01ARZ3NDEKTSV4RRFFQ69G5FAB',
        updateServiceRequestBody: {
          description: 'Updated service description',
          isDefault: true,
          callBehavior: {
            type: 'WEBHOOK',
            webhook: {
              url: 'https://example.com/webhook',
              fallbackUrl: 'https://example.com/fallback',
            },
          },
        },
      };
      const expectedResponse: Voice.v2.ServiceResponse = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        createTime: new Date('2025-01-01T00:00:00Z'),
        updateTime: new Date('2025-06-01T09:15:00Z'),
        name: 'My Voice Service',
        description: 'Updated service description',
        isDefault: true,
        callBehavior: {
          type: 'WEBHOOK',
          webhook: {
            url: 'https://example.com/webhook',
            fallbackUrl: 'https://example.com/fallback',
          },
        },
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

  describe('delete', () => {
    it('should make a DELETE request to delete a voice service', async () => {
      // Given
      const requestData: Voice.v2.DeleteServiceRequestData = {
        serviceId: '6e124178-c29d-46a5-943c-5c2ae544aade',
      };

      // When
      fixture.delete.mockResolvedValue();
      servicesApi.delete = fixture.delete;
      const response = await servicesApi.delete(requestData);

      // Then
      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });
});
