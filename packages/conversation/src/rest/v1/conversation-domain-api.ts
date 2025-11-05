import {
  Api,
  ApiClient,
  ConversationRegion,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyConversationApiClient, LazyConversationTemplateApiClient } from './conversation-service';

export const DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING = '** DEPRECATION NOTICE ** '
  + 'The "conversationRegion" property will become mandatory in the next major version of the SDK and not default '
  + 'to "us" anymore. Please set it to a valid region.';

export class ConversationDomainApi implements Api {
  constructor(
    public readonly lazyClient: LazyConversationApiClient | LazyConversationTemplateApiClient,
    public readonly apiName: string,
  ) {}

  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string) {
    if (this.apiName === 'TemplatesV1Api' || this.apiName === 'TemplatesV2Api') {
      this.lazyClient.sharedConfig.conversationTemplatesHostname = hostname;
    } else {
      this.lazyClient.sharedConfig.conversationHostname = hostname;
    }
    if (this.lazyClient.getApiClient()) {
      this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the region in the basePath
   * @param {ConversationRegion} region - The new region to send the requests to
   */
  public setRegion(region: ConversationRegion) {
    this.lazyClient.sharedConfig.conversationRegion = region;
    this.lazyClient.resetApiClient();
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials} credentials
   */
  public setCredentials(credentials: Partial<UnifiedCredentials>) {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetApiClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Conversation API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
