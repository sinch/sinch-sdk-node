import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  FAX_HOSTNAME,
  FaxRegion,
  SinchClientParameters,
  UnifiedCredentials,
  LazyApiClient,
  resolveClientParameters,
} from '@sinch/sdk-client';
import { FaxToEmailApi } from './fax-to-email';
import { FaxesApi } from './faxes';
import { ServicesApi } from './services';
import { CoverPagesApi } from './cover-pages';

/** @internal */
export class LazyFaxApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Fax');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      // Note: Fax API is global; do not rely on faxRegion. Keep hostname resolution only.
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.faxHostname ?? FAX_HOSTNAME;
    }
    return this.apiFetchClient;
  }
}

/**
 * The Fax Service exposes the following APIs:
 *  - services
 *  - faxes
 *  - faxToEmail
 *  - coverPages
 */
export class FaxService {
  /** @deprecated Use faxToEmail instead */
  public readonly emails: FaxToEmailApi;
  public readonly faxToEmail: FaxToEmailApi;
  public readonly faxes: FaxesApi;
  public readonly services: ServicesApi;
  public readonly coverPages: CoverPagesApi;

  /** @internal */
  public readonly lazyClient: LazyFaxApiClient;

  /** @internal */
  constructor(params: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(params);
    this.lazyClient = new LazyFaxApiClient(resolvedParams);

    this.emails = new FaxToEmailApi(this.lazyClient);
    this.faxToEmail = new FaxToEmailApi(this.lazyClient);
    this.faxes = new FaxesApi(this.lazyClient);
    this.services = new ServicesApi(this.lazyClient);
    this.coverPages = new CoverPagesApi(this.lazyClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(newParams);
    this.lazyClient.sharedConfig = resolvedParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.faxHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Update the current region for each API
   * @param {FaxRegion} _region - The new region to use in the production URL
   * @deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setRegion(_region: FaxRegion) {
    // Deprecated: regions are ignored by the Fax API which uses a single global endpoint.
    // Keep this method for backward compatibility but avoid mutating shared state or
    // resetting the client to prevent unexpected side effects.
    this.lazyClient.sharedConfig.logger.info(`Deprecated: The regions are not used for the Fax API, the request will be perform against the global endpoint ${FAX_HOSTNAME}`);
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
        'Impossible to assign the new credentials to the Fax API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
