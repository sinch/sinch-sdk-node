import {
  Api, ApiClient,
  FaxRegion,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyFaxApiClient } from './fax-service';

export class FaxDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazyFaxApiClient,
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
    this.lazyClient.sharedConfig.faxHostname = hostname;
    if (this.lazyClient.getApiClient()) {
      this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the region in the basePath
   * @param {FaxRegion} region - The new region to send the requests to
   */
  public setRegion(region: FaxRegion) {
    this.lazyClient.sharedConfig.faxRegion = region;
    this.lazyClient.resetApiClient();
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials} credentials
   */
  public setCredentials(credentials: UnifiedCredentials) {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetApiClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Fax API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
