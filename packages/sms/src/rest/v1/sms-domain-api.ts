import {
  Api,
  ApiClient,
  ApiClientOptions,
  ApiFetchClient,
  SinchClientParameters,
  Region,
  ApiTokenRequest,
  Oauth2TokenRequest, UnifiedCredentials, ServicePlanIdCredentials,
} from '@sinch/sdk-client';

export class SmsDomainApi implements Api {
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
      this.client = this.getSinchClient();
      this.client.apiClientOptions.hostname = hostname;
    } catch (error) {
      console.error('Impossible to set a new hostname, the Application credentials need to be provided first.');
      throw error;
    }
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials | ServicePlanIdCredentials} credentials
   */
  public setCredentials(credentials: UnifiedCredentials | ServicePlanIdCredentials) {
    const parametersBackup = { ...this.sinchClientParameters };
    this.sinchClientParameters = {
      ...parametersBackup,
      ...credentials,
    };
    this.resetApiClient();
    try {
      this.getSinchClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the SMS API');
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
      const region = this.sinchClientParameters.region || Region.UNITED_STATES;
      const apiClientOptions = this.buildApiClientOptions(this.sinchClientParameters, region);
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.sinchClientParameters.smsHostname ?? `https://${apiClientOptions.useServicePlanId?'':'zt.'}${region}.sms.api.sinch.com`;
    }
    return this.client;
  }

  private buildApiClientOptions(params: SinchClientParameters, region: Region): ApiClientOptions {
    let apiClientOptions: ApiClientOptions | undefined;
    // Check the region: if US or EU, try to use the OAuth2 authentication with the access key / secret under the project Id
    if (!params.forceServicePlanIdUsageForSmsApi
      && (region === Region.UNITED_STATES || region === Region.EUROPE)) {
      // Let's check the required parameters for OAuth2 authentication
      if (params.projectId && params.keyId && params.keySecret) {
        apiClientOptions = {
          projectId: params.projectId,
          requestPlugins: [new Oauth2TokenRequest(params.keyId, params.keySecret)],
          useServicePlanId: false,
        };
      }
    }
    if (!apiClientOptions) {
      // The API client options couldn't be initialized for with the projectId unified authentication.
      // Let's try with the servicePlanId
      if (params.servicePlanId && params.apiToken) {
        apiClientOptions = {
          projectId: params.servicePlanId,
          requestPlugins: [new ApiTokenRequest(params.apiToken)],
          useServicePlanId: true,
        };
      }
    }
    if (!apiClientOptions) {
      throw new Error('Invalid parameters for the SMS API: check your configuration');
    }
    return apiClientOptions;
  }
}
