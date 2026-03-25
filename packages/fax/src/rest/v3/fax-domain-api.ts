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
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Update the region in the basePath
   * @param {FaxRegion} _region - The new region to send the requests to
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setRegion(_region: FaxRegion) {
    // Deprecated: regions are ignored by the Fax API which uses a single global endpoint.
    // Keep this method for backward compatibility but avoid mutating shared state or
    // resetting the client to prevent unexpected side effects.
    console.info(`Deprecated: The regions are not used for the Fax API, the request will be perform against the global endpoint ${this.lazyClient.sharedConfig.faxHostname ?? 'https://fax.api.sinch.com'}`);
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
      console.error('Impossible to assign the new credentials to the Fax API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
