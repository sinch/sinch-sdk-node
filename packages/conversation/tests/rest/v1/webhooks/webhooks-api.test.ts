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
        webhookCreateRequestBody: {
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
      fixture.create.mockResolvedValue(expectedResponse);
      webhooksApi.create = fixture.create;
      const response = await webhooksApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
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
      fixture.delete.mockResolvedValue(expectedResponse);
      webhooksApi.delete = fixture.delete;
      const response = await webhooksApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
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
      fixture.get.mockResolvedValue(expectedResponse);
      webhooksApi.get = fixture.get;
      const response = await webhooksApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
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
      fixture.list.mockResolvedValue(expectedResponse);
      webhooksApi.list = fixture.list;
      const response = await webhooksApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateWebhook', () => {
    it('should make a PATCH request to update an existing webhook as specified by the webhook ID.', async () => {
      // Given
      const requestData: UpdateWebhookRequestData = {
        webhook_id: 'webhook_id',
        webhookUpdateRequestBody: {
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
      fixture.update.mockResolvedValue(expectedResponse);
      webhooksApi.update = fixture.update;
      const response = await webhooksApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
