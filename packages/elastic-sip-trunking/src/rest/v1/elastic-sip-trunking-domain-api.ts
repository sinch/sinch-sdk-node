import {
  Api,
  ApiClient,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyElasticSipTrunkingApiClient } from './elastic-sip-trunking-service';

export class ElasticSipTrunkingDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazyElasticSipTrunkingApiClient,
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
    this.lazyClient.sharedConfig.elasticSipTrunkingHostname = hostname;
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
    this.lazyClient.resetClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Elastic SIP Trunking API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
