import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  PROVISIONING_HOSTNAME,
  SinchClientParameters,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { WebhooksApi } from './webhooks';

export class LazyProvisioningApiClient {
  apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Provisioning');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.provisioningHostname ?? PROVISIONING_HOSTNAME;
    }
    return this.apiFetchClient;
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }
}

export class ProvisioningService {
  public readonly webhooks: WebhooksApi;
  public readonly lazyClient: LazyProvisioningApiClient;

  constructor(params: SinchClientParameters) {
    const sharedClient = new LazyProvisioningApiClient(params);
    this.lazyClient = sharedClient;
    this.webhooks = new WebhooksApi(sharedClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyClient.sharedConfig = newParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyClient.sharedConfig.provisioningHostname = hostname;
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
      console.error('Impossible to assign the new credentials to the Provisioning API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
