import {
  Api,
  ApiClient,
  ConversationRegion,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyConversationApiClient, LazyConversationTemplateApiClient } from './conversation-service';

export class ConversationDomainApi implements Api {
  constructor(
    /** @internal */
    public readonly lazyClient: LazyConversationApiClient | LazyConversationTemplateApiClient,
    /** @internal */
    public readonly apiName: string,
  ) {}

  /** @internal */
  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Kept for backward compatibility - TODO: remove in future major release
   * @return {ApiClient}
   * @deprecated
   */
  /** @internal */
  public getSinchClient(): ApiClient {
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
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
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
