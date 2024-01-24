import { SinchClientParameters } from '@sinch/sdk-client';
import { ContactApi } from './contact';
import { AppApi } from './app';
import { EventsApi } from './events';
import { MessagesApi } from './messages';
import { TranscodingApi } from './transcoding';
import { CapabilityApi } from './capability';
import { ConversationApi } from './conversation';
import { WebhooksApi } from './webhooks';

export class ConversationDomain {
  public readonly contact: ContactApi;
  public readonly app: AppApi;
  public readonly events: EventsApi;
  public readonly messages: MessagesApi;
  public readonly transcoding: TranscodingApi;
  public readonly capability: CapabilityApi;
  public readonly conversation: ConversationApi;
  public readonly webhooks: WebhooksApi;

  constructor(params: SinchClientParameters) {
    this.contact = new ContactApi(params);
    this.app = new AppApi(params);
    this.events = new EventsApi(params);
    this.messages = new MessagesApi(params);
    this.transcoding = new TranscodingApi(params);
    this.capability = new CapabilityApi(params);
    this.conversation = new ConversationApi(params);
    this.webhooks = new WebhooksApi(params);
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
  }
}
