import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  NUMBER_LOOKUP_HOSTNAME,
  LazyApiClient,
  SinchClientParameters,
  UnifiedCredentials,
  resolveClientParameters,
} from '@sinch/sdk-client';
import { NumberLookupApi } from './number-lookup';
import { NumberLookupRequestData, NumberLookupResponse } from '../../models';

export class LazyNumberLookupApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Number Lookup');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.numberLookupHostname ?? NUMBER_LOOKUP_HOSTNAME;
    }
    return this.apiFetchClient;
  }
}

export class NumberLookupService {
  private readonly _numberLookup: NumberLookupApi;

  public readonly lazyClient: LazyNumberLookupApiClient;

  constructor(params: SinchClientParameters) {
    const sharedClient = new LazyNumberLookupApiClient(params);
    this.lazyClient = sharedClient;

    this._numberLookup = new NumberLookupApi(sharedClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyClient.sharedConfig = resolveClientParameters(newParams);
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyClient.sharedConfig.numberLookupHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  public setCredentials(credentials: Partial<UnifiedCredentials>): void {
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

  public async lookup(data: NumberLookupRequestData): Promise<NumberLookupResponse> {
    return this._numberLookup.lookup(data);
  }
}
