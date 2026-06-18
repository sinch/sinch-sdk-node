import { SinchClientParameters } from '@sinch/sdk-client';
import {
  Provisioning,
  LazyProvisioningApiClient,
} from '../../../../src';
import { WebhooksApi, WebhooksApiFixture } from '../../../../src/rest/v1/webhooks';

describe('WebhooksApi', () => {
  let webhooksApi: WebhooksApi;
  let fixture: WebhooksApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new WebhooksApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyProvisioningApiClient(credentials);
    webhooksApi = new WebhooksApi(lazyClient);
  });

  describe('create', () => {
    it('should make a POST request to register a webhook for a project', async () => {
      const requestData: Provisioning.CreateWebhookRequestData = {
        webhookCreateRequestBody: {
          target: 'https://example.com/webhook',
          secret: 'secret',
          triggers: ['ALL'],
        },
      };
      const expectedResponse: Provisioning.Webhook = {
        id: 'webhook-id',
        target: 'https://example.com/webhook',
        projectId: 'PROJECT_ID',
        triggers: ['ALL'],
      };

      fixture.create.mockResolvedValue(expectedResponse);
      webhooksApi.create = fixture.create;
      const response = await webhooksApi.create(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe('delete', () => {
    it('should make a DELETE request to delete a webhook', async () => {
      const requestData: Provisioning.DeleteWebhookRequestData = {
        webhookId: 'webhook-id',
      };

      fixture.delete.mockResolvedValue(undefined);
      webhooksApi.delete = fixture.delete;
      const response = await webhooksApi.delete(requestData);

      expect(response).toBeUndefined();
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe('get', () => {
    it('should make a GET request to get a webhook', async () => {
      const requestData: Provisioning.GetWebhookRequestData = {
        webhookId: 'webhook-id',
      };
      const expectedResponse: Provisioning.Webhook = {
        id: 'webhook-id',
        target: 'https://example.com/webhook',
        projectId: 'PROJECT_ID',
        triggers: ['ALL'],
      };

      fixture.get.mockResolvedValue(expectedResponse);
      webhooksApi.get = fixture.get;
      const response = await webhooksApi.get(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe('list', () => {
    it('should make a GET request to list webhooks in a project', async () => {
      const requestData: Provisioning.ListWebhooksRequestData = {
        pageSize: 15,
      };
      const expectedResponse: Provisioning.ListWebhooksResponse = {
        totalSize: 1,
        pageSize: 15,
        webhooks: [
          {
            id: 'webhook-id',
            target: 'https://example.com/webhook',
            projectId: 'PROJECT_ID',
            triggers: ['ALL'],
          },
        ],
      };

      fixture.list.mockResolvedValue(expectedResponse);
      webhooksApi.list = fixture.list;
      const response = await webhooksApi.list(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe('replace', () => {
    it('should make a PUT request to replace a webhook', async () => {
      const requestData: Provisioning.ReplaceWebhookRequestData = {
        webhookId: 'webhook-id',
        webhookReplaceRequestBody: {
          target: 'https://example.com/webhook-new',
          secret: 'new-secret',
          triggers: ['WHATSAPP_SENDER_ACTIVE'],
        },
      };
      const expectedResponse: Provisioning.Webhook = {
        id: 'webhook-id',
        target: 'https://example.com/webhook-new',
        projectId: 'PROJECT_ID',
        triggers: ['WHATSAPP_SENDER_ACTIVE'],
      };

      fixture.replace.mockResolvedValue(expectedResponse);
      webhooksApi.replace = fixture.replace;
      const response = await webhooksApi.replace(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.replace).toHaveBeenCalledWith(requestData);
    });
  });

  describe('update', () => {
    it('should make a PATCH request to update a webhook', async () => {
      const requestData: Provisioning.UpdateWebhookRequestData = {
        webhookId: 'webhook-id',
        webhookUpdateRequestBody: {
          triggers: ['WHATSAPP_SENDER_ACTIVE'],
        },
      };
      const expectedResponse: Provisioning.Webhook = {
        id: 'webhook-id',
        target: 'https://example.com/webhook',
        projectId: 'PROJECT_ID',
        triggers: ['WHATSAPP_SENDER_ACTIVE'],
      };

      fixture.update.mockResolvedValue(expectedResponse);
      webhooksApi.update = fixture.update;
      const response = await webhooksApi.update(requestData);

      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
