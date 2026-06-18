import { WebhooksApi } from './webhooks-api';
import {
  Webhook,
  CreateWebhookRequestData,
  DeleteWebhookRequestData,
  GetWebhookRequestData,
  ListWebhooksRequestData,
  ListWebhooksResponse,
  ReplaceWebhookRequestData,
  UpdateWebhookRequestData,
} from '../../../models';

export class WebhooksApiFixture implements Partial<Readonly<WebhooksApi>> {

  public delete: jest.Mock<Promise<void>, [DeleteWebhookRequestData]> = jest.fn();
  public create: jest.Mock<Promise<Webhook>, [CreateWebhookRequestData]> = jest.fn();
  public get: jest.Mock<Promise<Webhook>, [GetWebhookRequestData]> = jest.fn();
  public list: jest.Mock<Promise<ListWebhooksResponse>, [ListWebhooksRequestData]> = jest.fn();
  public replace: jest.Mock<Promise<Webhook>, [ReplaceWebhookRequestData]> = jest.fn();
  public update: jest.Mock<Promise<Webhook>, [UpdateWebhookRequestData]> = jest.fn();
}
