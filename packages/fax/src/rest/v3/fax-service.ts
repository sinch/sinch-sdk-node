import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  FAX_HOSTNAME,
  FaxRegion,
  formatRegionalizedHostname,
  SinchClientParameters,
  SupportedFaxRegion, UnifiedCredentials,
} from '@sinch/sdk-client';
import { FaxToEmailApi } from './fax-to-email';
import { FaxesApi } from './faxes';
import { ServicesApi } from './services';
import { CoverPagesApi } from './cover-pages';

export class LazyFaxApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Fax');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      const region = this.sharedConfig.faxRegion ?? FaxRegion.DEFAULT;
      if(!Object.values(SupportedFaxRegion).includes(region as SupportedFaxRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Fax API`);
      }
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.faxHostname ?? this.buildHostname(region);
    }
    return this.apiFetchClient;
  }

  private buildHostname(region: FaxRegion) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return formatRegionalizedHostname(FAX_HOSTNAME, formattedRegion);
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
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

  private readonly lazyClient: LazyFaxApiClient;

  constructor(params: SinchClientParameters) {
    this.lazyClient = new LazyFaxApiClient(params);

    this.emails = new FaxToEmailApi(this.lazyClient);
    this.faxToEmail = new FaxToEmailApi(this.lazyClient);
    this.faxes = new FaxesApi(this.lazyClient);
    this.services = new ServicesApi(this.lazyClient);
    this.coverPages = new CoverPagesApi(this.lazyClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyClient.sharedConfig = newParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.faxHostname = hostname;
    if (this.lazyClient.getApiClient()) {
      this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the current region for each API
   * @param {FaxRegion} region - The new region to use in the production URL
   */
  public setRegion(region: FaxRegion) {
    this.lazyClient.sharedConfig.faxRegion = region;
    this.lazyClient.resetApiClient();
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
      console.error('Impossible to assign the new credentials to the Fax API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
