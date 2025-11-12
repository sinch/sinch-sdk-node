import {
  Api,
  ApiClient,
  ApplicationCredentials,
} from '@sinch/sdk-client';
import { LazyVerificationApiClient } from './verification-service';

export class VerificationDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazyVerificationApiClient,
    public readonly apiName: string,
  ) {}

  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Kept for backward compatibility - TODO: remove in future major release
   * @return {ApiClient}
   * @deprecated
   */
  public getSinchClient(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.verificationHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Updates the application credentials used to authenticate API requests
   * @param {ApplicationCredentials} credentials
   */
  public setCredentials(credentials: Partial<ApplicationCredentials>) {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetApiClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Verification API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

  /**
   * @deprecated Use setCredentials instead
   */
  public setApplication(credentials: ApplicationCredentials) {
    this.setCredentials(credentials);
  }

}
