import { WebhooksApi } from './webhooks-api';
import {
  Webhook,
  CreateWebhookRequestData,
  DeleteWebhookRequestData,
  GetWebhookRequestData,
  ListWebhooksRequestData,
  ListWebhooksResponse,
  UpdateWebhookRequestData,
} from '../../../models';

export class WebhooksApiFixture implements Partial<Readonly<WebhooksApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<Webhook>, [CreateWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Webhook>, [GetWebhookRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<Promise<ListWebhooksResponse>, [ListWebhooksRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<Webhook>, [UpdateWebhookRequestData]> = jest.fn();
}
