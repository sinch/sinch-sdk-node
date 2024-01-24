import { ListWebhooksResponse } from '../../../models';
import { Webhook } from '../../../models';
import { WebhooksApi, CreateWebhookRequestData, DeleteWebhookRequestData, GetWebhookRequestData, ListWebhooksRequestData, UpdateWebhookRequestData } from './webhooks-api';

export class WebhooksApiFixture implements Partial<Readonly<WebhooksApi>> {

  /**
   * Fixture associated to function createWebhook
   */
  public createWebhook: jest.Mock<Promise<Webhook>, [CreateWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteWebhook
   */
  public deleteWebhook: jest.Mock<Promise<any>, [DeleteWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function getWebhook
   */
  public getWebhook: jest.Mock<Promise<Webhook>, [GetWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function listWebhooks
   */
  public listWebhooks: jest.Mock<Promise<ListWebhooksResponse>, [ListWebhooksRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateWebhook
   */
  public updateWebhook: jest.Mock<Promise<Webhook>, [UpdateWebhookRequestData]> = jest.fn();
}

