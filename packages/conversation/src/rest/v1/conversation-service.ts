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

export class ConversationService {
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
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.contact.setHostname(hostname);
    this.app.setHostname(hostname);
    this.events.setHostname(hostname);
    this.messages.setHostname(hostname);
    this.transcoding.setHostname(hostname);
    this.capability.setHostname(hostname);
    this.conversation.setHostname(hostname);
    this.webhooks.setHostname(hostname);
    this.templatesV1.setHostname(hostname);
    this.templatesV2.setHostname(hostname);
  }
}
