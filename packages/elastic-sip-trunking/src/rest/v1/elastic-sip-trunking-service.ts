import {
  ApiClient,
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  ELASTIC_SIP_TRUNKING_HOSTNAME,
  SinchClientParameters,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { SipTrunksApi } from './sip-trunks';
import { AccessControlListApi } from './access-control-list';
import { SipEndpointsApi } from './sip-endpoints';
import { CountryPermissionsApi } from './country-permissions';
import { CallsHistoryApi } from './calls-history';
import { ProjectsApi } from './projects';

export class LazyElasticSipTrunkingApiClient {
  private client?: ApiClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiClient {
    if (!this.client) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Elastic SIP Trunking');
      this.client = new ApiFetchClient(apiClientOptions);
      this.client.apiClientOptions.hostname = this.sharedConfig.elasticSipTrunkingHostname
        ?? ELASTIC_SIP_TRUNKING_HOSTNAME;
    }
    return this.client;
  }

  public resetClient() {
    this.client = undefined;
  }
}

export class ElasticSipTrunkingService {

  public readonly sipTrunks: SipTrunksApi;
  public readonly sipEndpoints: SipEndpointsApi;
  public readonly accessControlList: AccessControlListApi;
  public readonly countryPermissions: CountryPermissionsApi;
  public readonly calls: CallsHistoryApi;
  public readonly projects: ProjectsApi;

  private readonly lazyClient: LazyElasticSipTrunkingApiClient;

  constructor(params: SinchClientParameters) {
    this.lazyClient = new LazyElasticSipTrunkingApiClient(params);

    this.sipTrunks = new SipTrunksApi(this.lazyClient);
    this.sipEndpoints = new SipEndpointsApi(this.lazyClient);
    this.accessControlList = new AccessControlListApi(this.lazyClient);
    this.countryPermissions = new CountryPermissionsApi(this.lazyClient);
    this.calls = new CallsHistoryApi(this.lazyClient);
    this.projects = new ProjectsApi(this.lazyClient);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyClient.sharedConfig.elasticSipTrunkingHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  public setCredentials(credentials: Partial<UnifiedCredentials>): void {
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
