import {
  Api,
  ApiClient,
  ApiFetchClient,
  ApplicationCredentials,
  buildApplicationSignedApiClientOptions,
  SinchClientParameters,
  VoiceRegion,
} from '@sinch/sdk-client';

export class VoiceDomainApi implements Api {
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
   * Update the region in the hostname
   * @param {VoiceRegion} region - The new region to send the requests to
   */
  public setRegion(region: VoiceRegion) {
    this.sinchClientParameters.voiceRegion = region;
    if (this.client) {
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
  }

  /**
   * Updates the application credentials used to authenticate API requests
   * @param {ApplicationCredentials} credentials
   */
  public setApplication(credentials: ApplicationCredentials) {
    const parametersBackup = { ...this.sinchClientParameters };
    this.sinchClientParameters = {
      ...parametersBackup,
      ...credentials,
    };
    this.resetApiClient();
    try {
      this.getSinchClient();
    } catch (error) {
      console.error('Impossible to assign the new application to the Voice API');
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
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sinchClientParameters, 'Voice');
      this.client = new ApiFetchClient(apiClientOptions);
      const region: VoiceRegion = this.sinchClientParameters.voiceRegion || VoiceRegion.DEFAULT;
      this.client.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.client;
  }

  private buildHostname(region: VoiceRegion) {
    switch (this.apiName) {
    case 'ApplicationsApi':
      return this.sinchClientParameters.voiceApplicationManagementHostname ?? 'https://callingapi.sinch.com';
    default:
      return this.sinchClientParameters.voiceHostname ?? `https://calling${region}.api.sinch.com`;
    }
  }

}
