import {
  Api,
  ApiClient, ApiClientOptions,
  ApiFetchClient,
  SinchClientParameters,
  Oauth2TokenRequest, UnifiedCredentials,
} from '@sinch/sdk-client';

export class NumbersDomainApi implements Api {
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
      console.error('Impossible to assign the new credentials to the Numbers API');
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
      const apiClientOptions = this.buildApiClientOptions(this.sinchClientParameters);
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.sinchClientParameters.numbersHostname ?? 'https://numbers.api.sinch.com';
    }
    return this.client;
  }

  private buildApiClientOptions(params: SinchClientParameters): ApiClientOptions {
    if (!params.projectId || !params.keyId || !params.keySecret) {
      throw new Error('Invalid configuration for the Numbers API: '
        + '"projectId", "keyId" and "keySecret" values must be provided');
    }
    return {
      projectId: params.projectId,
      requestPlugins: [new Oauth2TokenRequest( params.keyId,  params.keySecret)],
      useServicePlanId: false,
    };
  }
}
