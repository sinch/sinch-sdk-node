import {
  Api,
  ApiClient,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyNumbersApiClient } from './numbers-service';

export class NumbersDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazyNumbersApiClient,
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
    this.lazyClient.sharedConfig.numbersHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
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
      console.error('Impossible to assign the new credentials to the Numbers API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
