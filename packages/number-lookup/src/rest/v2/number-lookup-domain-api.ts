import {
  Api,
  ApiClient,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyNumberLookupApiClient } from './number-lookup-service';

export class NumberLookupDomainApi implements Api {

  /** @internal */
  constructor(
    /** @internal */
    public readonly lazyClient: LazyNumberLookupApiClient,
    /** @internal */
    public readonly apiName: string,
  ) {}

  /** @internal */
  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  /** @internal */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.numberLookupHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials} credentials
   */
  /** @internal */
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
      this.lazyClient.sharedConfig.logger.error(
        'Impossible to assign the new credentials to the Number Lookup API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
