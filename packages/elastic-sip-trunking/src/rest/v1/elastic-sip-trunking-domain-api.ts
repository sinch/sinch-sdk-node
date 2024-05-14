import {
  Api,
  ApiClient,
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  ELASTIC_SIP_TRUNKING_HOSTNAME,
  SinchClientParameters,
  UnifiedCredentials,
} from '@sinch/sdk-client';

export class ElasticSipTrunkingDomainApi implements Api {
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
    this.client = this.getSinchClient();
    this.client.apiClientOptions.hostname = hostname;
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
      console.error('Impossible to assign the new credentials to the Elastic SIP Trunking API');
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
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sinchClientParameters, 'Elastic SIP Trunking');
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.sinchClientParameters.elasticSipTrunkingHostname
        ?? ELASTIC_SIP_TRUNKING_HOSTNAME;
    }
    return this.client;
  }

}
