import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CreateWebhookRequestData,
  DeleteWebhookRequestData,
  GetWebhookRequestData, ListWebhooksRequestData,
  ListWebhooksResponse, UpdateWebhookRequestData,
} from '../../../../src';
import { Webhook } from '../../../../src';
import { WebhooksApi, WebhooksApiFixture } from '../../../../src';

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
    webhooksApi = new WebhooksApi(credentials);
  });


  describe ('createWebhook', () => {
    it('should make a POST request to create a webhook for receiving callbacks on specific triggers', async () => {
      // Given
      const requestData: CreateWebhookRequestData = {
        webhookBody: {
          app_id: 'app_id',
          target: 'target',
          triggers: [
            'MESSAGE_DELIVERY',
          ],
        },
      };
      const expectedResponse: Webhook = {
        app_id: 'app_id',
        client_credentials: {
          client_id: 'client_id',
          client_secret: 'client_secret',
          endpoint: 'endpoint',
        },
        id: 'id',
        secret: 'secret',
        target: 'target',
        target_type: 'DISMISS',
        triggers: [
          'MESSAGE_DELIVERY',
        ],
      };

      // When
      fixture.createWebhook.mockResolvedValue(expectedResponse);
      webhooksApi.createWebhook = fixture.createWebhook;
      const response = await webhooksApi.createWebhook(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.createWebhook).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteWebhook', () => {
    it('should make a DELETE request to delete a webhook as specified by the webhook ID.', async () => {
      // Given
      const requestData: DeleteWebhookRequestData = {
        webhook_id: 'webhook_id',
      };
      const expectedResponse: any = {};

      // When
      fixture.deleteWebhook.mockResolvedValue(expectedResponse);
      webhooksApi.deleteWebhook = fixture.deleteWebhook;
      const response = await webhooksApi.deleteWebhook(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.deleteWebhook).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getWebhook', () => {
    it('should make a GET request to get a webhook as specified by the webhook ID.', async () => {
      // Given
      const requestData: GetWebhookRequestData = {
        webhook_id: 'webhook_id',
      };
      const expectedResponse: Webhook = {
        app_id: 'app_id',
        client_credentials: {
          client_id: 'client_id',
          client_secret: 'client_secret',
          endpoint: 'endpoint',
        },
        id: 'id',
        secret: 'secret',
        target: 'target',
        target_type: 'DISMISS',
        triggers: [
          'MESSAGE_DELIVERY',
        ],
      };

      // When
      fixture.getWebhook.mockResolvedValue(expectedResponse);
      webhooksApi.getWebhook = fixture.getWebhook;
      const response = await webhooksApi.getWebhook(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getWebhook).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listWebhooks', () => {
    it('should make a GET request to list all webhooks for a given app as specified by the App ID.', async () => {
      // Given
      const requestData: ListWebhooksRequestData = {
        app_id: 'app_id',
      };
      const expectedResponse: ListWebhooksResponse = {
        webhooks: [
          {
            app_id: 'app_id',
            client_credentials: {
              client_id: 'client_id',
              client_secret: 'client_secret',
              endpoint: 'endpoint',
            },
            id: 'id',
            secret: 'secret',
            target: 'target',
            target_type: 'DISMISS',
            triggers: [
              'MESSAGE_DELIVERY',
            ],
          },
        ],
      };

      // When
      fixture.listWebhooks.mockResolvedValue(expectedResponse);
      webhooksApi.listWebhooks = fixture.listWebhooks;
      const response = await webhooksApi.listWebhooks(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listWebhooks).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateWebhook', () => {
    it('should make a PATCH request to update an existing webhook as specified by the webhook ID.', async () => {
      // Given
      const requestData: UpdateWebhookRequestData = {
        webhook_id: 'webhook_id',
        webhookBody: {
          app_id: 'app_id',
          target: 'target',
          triggers: [
            'MESSAGE_DELIVERY',
          ],
        },
      };
      const expectedResponse: Webhook = {
        app_id: 'app_id',
        client_credentials: {
          client_id: 'client_id',
          client_secret: 'client_secret',
          endpoint: 'endpoint',
        },
        id: 'id',
        secret: 'secret',
        target: 'target',
        target_type: 'DISMISS',
        triggers: [
          'MESSAGE_DELIVERY',
        ],
      };

      // When
      fixture.updateWebhook.mockResolvedValue(expectedResponse);
      webhooksApi.updateWebhook = fixture.updateWebhook;
      const response = await webhooksApi.updateWebhook(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.updateWebhook).toHaveBeenCalledWith(requestData);
    });
  });
});
