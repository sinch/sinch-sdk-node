import {
  Api,
  ApiClient,
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  CONVERSATION_HOSTNAME,
  CONVERSATION_TEMPLATES_HOSTNAME,
  ConversationRegion,
  formatRegionalizedHostname,
  SinchClientParameters,
  SupportedConversationRegion,
  UnifiedCredentials,
} from '@sinch/sdk-client';

export const DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING = '** DEPRECATION NOTICE ** '
  + 'The "conversationRegion" property will become mandatory in the next major version of the SDK and not default '
  + 'to "us" anymore. Please set it to a valid region.';

export class ConversationDomainApi implements Api {
  public readonly apiName: string;
  public client?: ApiClient;
  private sinchClientParameters: SinchClientParameters;

  constructor(sinchClientParameters: SinchClientParameters, apiName: string) {
    this.sinchClientParameters = sinchClientParameters;
    this.apiName = apiName;
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string) {
    try {
      // The 2 following lines are a workaround to detect if the hostname is set for the Conversation or Templates API - To be deleted in 2.0
      this.sinchClientParameters.conversationHostname = hostname;
      this.sinchClientParameters.conversationTemplatesHostname = hostname;
      this.client = this.getSinchClient();
      this.client.apiClientOptions.hostname = hostname;
    } catch (error) {
      console.error('Impossible to set a new hostname, the credentials need to be provided first.');
      throw error;
    }
  }

  /**
   * Update the region in the basePath
   * @param {ConversationRegion} region - The new region to send the requests to
   */
  public setRegion(region: ConversationRegion) {
    this.sinchClientParameters.conversationRegion = region;
    if (this.client) {
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials} credentials
   */
  public setCredentials(credentials: UnifiedCredentials) {
    const parametersBackup = { ...this.sinchClientParameters };
    this.sinchClientParameters = {
      ...parametersBackup,
      ...credentials,
    };
    this.resetApiClient();
    try {
      this.getSinchClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Conversation API');
      this.sinchClientParameters = parametersBackup;
      throw error;
    }
  }

  private resetApiClient() {
    this.client = undefined;
  }

  /**
   * Checks the configuration parameters are ok and initialize the API client. Once initialized, the same instance will
   * be returned for the subsequent API calls (singleton pattern)
   * @return {ApiClient} the API Client or throws an error in case the configuration parameters are not ok
   * @private
   */
  public getSinchClient(): ApiClient {
    if (!this.client) {
      const region = this.sinchClientParameters.conversationRegion ?? ConversationRegion.UNITED_STATES;
      // Deprecation Notice - to remove in 2.0
      const isConversationHostnameOverridden = !!this.sinchClientParameters.conversationHostname
        && this.apiName !== 'TemplatesV1Api'
        && this.apiName !== 'TemplatesV2Api';
      const isConversationTemplatesHostnameOverridden = !!this.sinchClientParameters.conversationTemplatesHostname
        && (this.apiName === 'TemplatesV1Api' || this.apiName === 'TemplatesV2Api');
      if (!this.sinchClientParameters.conversationRegion
        && !isConversationHostnameOverridden
        && !isConversationTemplatesHostnameOverridden) {
        console.warn(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
      }
      if(!Object.values(SupportedConversationRegion).includes(region as SupportedConversationRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Conversation API`);
      }
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sinchClientParameters, 'Conversation');
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.client;
  }

  private buildHostname(region: ConversationRegion) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    switch (this.apiName) {
    case 'TemplatesV1Api':
    case 'TemplatesV2Api':
      return this.sinchClientParameters.conversationTemplatesHostname
        ?? formatRegionalizedHostname(CONVERSATION_TEMPLATES_HOSTNAME, formattedRegion);
    default:
      return this.sinchClientParameters.conversationHostname
        ?? formatRegionalizedHostname(CONVERSATION_HOSTNAME, formattedRegion);
    }
  }

}
