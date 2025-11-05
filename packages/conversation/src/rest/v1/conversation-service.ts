import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  CONVERSATION_HOSTNAME,
  CONVERSATION_TEMPLATES_HOSTNAME,
  ConversationRegion,
  formatRegionalizedHostname,
  SinchClientParameters,
  SupportedConversationRegion, UnifiedCredentials,
} from '@sinch/sdk-client';
import { ContactApi } from './contact';
import { AppApi } from './app';
import { EventsApi } from './events';
import { MessagesApi } from './messages';
import { TranscodingApi } from './transcoding';
import { CapabilityApi } from './capability';
import { ConversationApi } from './conversation';
import { ProjectSettingsApi } from './project-settings';
import { WebhooksApi } from './webhooks';
import { TemplatesV1Api } from './templates-v1';
import { TemplatesV2Api } from './templates-v2';
import { ConsentsApi } from './consents';
import { DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING } from './conversation-domain-api';

export class LazyConversationApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const region = this.sharedConfig.conversationRegion ?? ConversationRegion.UNITED_STATES;
      // Deprecation Notice - to remove in 2.0
      const isConversationHostnameOverridden = !!this.sharedConfig.conversationHostname;
      if (!this.sharedConfig.conversationRegion && !isConversationHostnameOverridden) {
        console.warn(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
      }
      if(!Object.values(SupportedConversationRegion).includes(region as SupportedConversationRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Conversation API`);
      }
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Conversation');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.apiFetchClient;
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }

  private buildHostname(region: ConversationRegion) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return this.sharedConfig.conversationHostname
        ?? formatRegionalizedHostname(CONVERSATION_HOSTNAME, formattedRegion);
  }
}

export class LazyConversationTemplateApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const region = this.sharedConfig.conversationRegion ?? ConversationRegion.UNITED_STATES;
      // Deprecation Notice - to remove in 2.0
      const isConversationTemplatesHostnameOverridden = !!this.sharedConfig.conversationTemplatesHostname;
      if (!this.sharedConfig.conversationRegion && !isConversationTemplatesHostnameOverridden) {
        console.warn(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
      }
      if(!Object.values(SupportedConversationRegion).includes(region as SupportedConversationRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Conversation API`);
      }
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Conversation');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.apiFetchClient;
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }

  private buildHostname(region: ConversationRegion) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return this.sharedConfig.conversationTemplatesHostname
      ?? formatRegionalizedHostname(CONVERSATION_TEMPLATES_HOSTNAME, formattedRegion);
  }
}

/**
 * The Conversation Service exposes the following APIs:
 *  - app
 *  - contact
 *  - capability
 *  - conversation
 *  - messages
 *  - events
 *  - transcoding
 *  - webhooks
 *  - templatesV1
 *  - templatesV2
 */
export class ConversationService {
  public readonly contact: ContactApi;
  public readonly app: AppApi;
  public readonly events: EventsApi;
  public readonly messages: MessagesApi;
  public readonly transcoding: TranscodingApi;
  public readonly capability: CapabilityApi;
  public readonly conversation: ConversationApi;
  public readonly projectSettings: ProjectSettingsApi;
  public readonly webhooks: WebhooksApi;
  public readonly templatesV1: TemplatesV1Api;
  public readonly templatesV2: TemplatesV2Api;
  public readonly consents: ConsentsApi;

  private readonly lazyConversationClient: LazyConversationApiClient;
  private readonly lazyConversationTemplateClient: LazyConversationTemplateApiClient;

  /**
   * Create a new ConversationService instance with its configuration. It needs the following parameters for authentication:
   *  - `projectId`
   *  - `keyId`
   *  - `keySecret`
   *
   * Other supported properties:
   *  - `conversationRegion`
   *  - `conversationHostname`
   *  - `conversationTemplatesHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    const sharedConversationClient = new LazyConversationApiClient(params);
    this.lazyConversationClient = sharedConversationClient;

    const sharedConversationTemplateClient = new LazyConversationTemplateApiClient(params);
    this.lazyConversationTemplateClient = sharedConversationTemplateClient;


    this.contact = new ContactApi(sharedConversationClient);
    this.app = new AppApi(sharedConversationClient);
    this.events = new EventsApi(sharedConversationClient);
    this.messages = new MessagesApi(sharedConversationClient);
    this.transcoding = new TranscodingApi(sharedConversationClient);
    this.capability = new CapabilityApi(sharedConversationClient);
    this.conversation = new ConversationApi(sharedConversationClient);
    this.projectSettings = new ProjectSettingsApi(sharedConversationClient);
    this.webhooks = new WebhooksApi(sharedConversationClient);
    this.consents = new ConsentsApi(sharedConversationClient);
    this.templatesV1 = new TemplatesV1Api(sharedConversationTemplateClient);
    this.templatesV2 = new TemplatesV2Api(sharedConversationTemplateClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyConversationClient.sharedConfig = newParams;
    this.lazyConversationClient.resetApiClient();
    this.lazyConversationTemplateClient.sharedConfig = newParams;
    this.lazyConversationTemplateClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API (except Templates)
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyConversationClient.sharedConfig.conversationHostname = hostname;
    if (this.lazyConversationClient.getApiClient()) {
      this.lazyConversationClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the default hostname for the Templates APIs
   * @param {string} hostname - The new hostname to use for the Templates APIs.
   */
  public setTemplatesHostname(hostname: string): void {
    this.lazyConversationTemplateClient.sharedConfig.conversationTemplatesHostname = hostname;
    if (this.lazyConversationTemplateClient.getApiClient()) {
      this.lazyConversationTemplateClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Updates the credentials used to authenticate API requests.
   * @param credentials - The new credentials to use for the APIs.
   */
  public setCredentials(credentials: Partial<UnifiedCredentials>): void {
    const parametersBackup = { ...this.lazyConversationClient.sharedConfig };
    const parametersTemplatesBackup = { ...this.lazyConversationTemplateClient.sharedConfig };
    this.lazyConversationClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyConversationTemplateClient.sharedConfig = {
      ...parametersTemplatesBackup,
      ...credentials,
    };
    this.lazyConversationClient.resetApiClient();
    this.lazyConversationTemplateClient.resetApiClient();
    try {
      this.lazyConversationClient.getApiClient();
      this.lazyConversationTemplateClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Conversation API');
      this.lazyConversationClient.sharedConfig = parametersBackup;
      this.lazyConversationTemplateClient.sharedConfig = parametersTemplatesBackup;
      throw error;
    }
  }

  /**
   * Update the current region for each API
   * @param {ConversationRegion} region - The new region to use in the production URL
   */
  public setRegion(region: ConversationRegion) {
    this.lazyConversationClient.sharedConfig.conversationRegion = region;
    this.lazyConversationClient.resetApiClient();
    this.lazyConversationTemplateClient.sharedConfig.conversationRegion = region;
    this.lazyConversationTemplateClient.resetApiClient();
  }
}
