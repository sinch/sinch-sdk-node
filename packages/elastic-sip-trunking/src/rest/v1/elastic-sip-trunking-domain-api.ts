import {
  Api,
  ApiClient,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyElasticSipTrunkingApiClient } from './elastic-sip-trunking-service';

/**
 * Base class for Elastic SIP Trunking API clients.
 * @deprecated Elastic SIP Trunking support will be removed in version 2 of the SDK.
 */
export class ElasticSipTrunkingDomainApi implements Api {

  /** @internal */
  constructor(
    /** @internal */
    public readonly lazyClient: LazyElasticSipTrunkingApiClient,
    /** @internal */
    public readonly apiName: string,
  ) {}

  /** @internal */
  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Kept for backward compatibility - TODO: remove in future major release
   * @return {ApiClient}
   * @deprecated
   */
  /** @internal */
  public getSinchClient(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  /** @internal */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.elasticSipTrunkingHostname = hostname;
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
        'Impossible to assign the new credentials to the Elastic SIP Trunking API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
