import {
  Api,
  ApiClient,
  ApiFetchClient,
  SinchClientParameters,
  SigningRequest, XTimestampRequest, ApplicationCredentials,
} from '@sinch/sdk-client';

export class VerificationDomainApi implements Api {
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
      console.error('Impossible to assign the new application to the Verification API');
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
      this.client.apiClientOptions.hostname = this.sinchClientParameters.verificationHostname ?? 'https://verification.api.sinch.com';
    }
    return this.client;
  }
}
