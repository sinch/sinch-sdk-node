import { SinchClientParameters } from '@sinch/sdk-client';
import { ContactApi } from './contact';
import { AppApi } from './app';
import { EventsApi } from './events';
import { MessagesApi } from './messages';
import { TranscodingApi } from './transcoding';
import { CapabilityApi } from './capability';
import { ConversationApi } from './conversation';
import { WebhooksApi } from './webhooks';
import { TemplatesV1Api } from './templates-v1';
import { TemplatesV2Api } from './templates-v2';

export class ConversationDomain {
  public readonly contact: ContactApi;
  public readonly app: AppApi;
  public readonly events: EventsApi;
  public readonly messages: MessagesApi;
  public readonly transcoding: TranscodingApi;
  public readonly capability: CapabilityApi;
  public readonly conversation: ConversationApi;
  public readonly webhooks: WebhooksApi;
  public readonly templatesV1: TemplatesV1Api;
  public readonly templatesV2: TemplatesV2Api;


  constructor(params: SinchClientParameters) {
    this.contact = new ContactApi(params);
    this.app = new AppApi(params);
    this.events = new EventsApi(params);
    this.messages = new MessagesApi(params);
    this.transcoding = new TranscodingApi(params);
    this.capability = new CapabilityApi(params);
    this.conversation = new ConversationApi(params);
    this.webhooks = new WebhooksApi(params);
    this.templatesV1 = new TemplatesV1Api(params);
    this.templatesV2 = new TemplatesV2Api(params);
  }

  /**
   * Update the default basePath for each API
   *
   * @param {string} basePath - The new base path to use for all the APIs.
   */
  public setBasePath(basePath: string) {
    this.contact.setBasePath(basePath);
    this.app.setBasePath(basePath);
    this.events.setBasePath(basePath);
    this.messages.setBasePath(basePath);
    this.transcoding.setBasePath(basePath);
    this.capability.setBasePath(basePath);
    this.conversation.setBasePath(basePath);
    this.webhooks.setBasePath(basePath);
    this.templatesV1.setBasePath(basePath);
    this.templatesV2.setBasePath(basePath);
  }
}
