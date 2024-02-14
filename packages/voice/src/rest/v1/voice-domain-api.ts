import {
  Api,
  ApiClient,
  ApiFetchClient, ApplicationCredentials,
  SigningRequest,
  SinchClientParameters,
  VoiceRegion,
  XTimestampRequest,
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
   * Update the default basePath for the API
   * @param {string} basePath - The new base path to use for the APIs.
   */
  public setBasePath(basePath: string) {
    try {
      this.client = this.getSinchClient();
      this.client.apiClientOptions.basePath = basePath;
    } catch (error) {
      console.error('Impossible to set a new base path, the Application credentials need to be provided first.');
      throw error;
    }
  }

  /**
   * Update the region in the basePath
   * @param {VoiceRegion} region - The new region to send the requests to
   */
  public setRegion(region: VoiceRegion) {
    this.sinchClientParameters.voiceRegion = region;
    if (this.client) {
      this.client.apiClientOptions.basePath = this.buildBasePath(region);
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
      if (!this.sinchClientParameters.applicationKey || !this.sinchClientParameters.applicationSecret) {
        throw new Error('Invalid configuration for the Verification API: '
          + '"applicationKey" and "applicationSecret" values must be provided');
      }
      const apiClientOptions = {
        requestPlugins: [
          new XTimestampRequest(),
          new SigningRequest(this.sinchClientParameters.applicationKey, this.sinchClientParameters.applicationSecret),
        ],
      };
      this.client = new ApiFetchClient(apiClientOptions);
      const region: VoiceRegion = this.sinchClientParameters.voiceRegion || VoiceRegion.DEFAULT;
      this.client.apiClientOptions.basePath = this.buildBasePath(region);
    }
    return this.client;
  }

  private buildBasePath(region: VoiceRegion) {
    switch (this.apiName) {
    case 'ApplicationsApi':
      return `https://callingapi.sinch.com`;
    default:
      return `https://calling${region}.api.sinch.com`;
    }
  }

}
