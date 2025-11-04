import {
  ApiFetchClient,
  buildFlexibleOAuth2OrApiTokenApiClientOptions,
  formatRegionalizedHostname,
  SinchClientParameters,
  SMS_HOSTNAME,
  SmsRegion,
  SupportedSmsRegion, UnifiedCredentials,
} from '@sinch/sdk-client';
import { GroupsApi } from './groups';
import { DeliveryReportsApi } from './delivery-reports';
import { BatchesApi } from './batches';
import { InboundsApi } from './inbounds';

export const DEFAULT_SMS_REGION_DEPRECATION_WARNING = '** DEPRECATION NOTICE ** '
  + 'The "smsRegion" property will become mandatory in the next major version of the SDK and not default '
  + 'to "us" anymore. Please set it to a valid region.';

export class LazySmsApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const region = this.sharedConfig.smsRegion ?? SmsRegion.UNITED_STATES;
      // Deprecation Notice - to remove in 2.0
      if (!this.sharedConfig.smsRegion && !this.sharedConfig.smsHostname) {
        console.warn(DEFAULT_SMS_REGION_DEPRECATION_WARNING);
      }
      if(!Object.values(SupportedSmsRegion).includes(region as SupportedSmsRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the SMS API`);
      }
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(this.sharedConfig);
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      const useZapStack = !this.apiFetchClient.apiClientOptions.useServicePlanId;
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.smsHostname
        ?? this.buildHostname(region, useZapStack);
    }
    return this.apiFetchClient;
  }

  private buildHostname(region: SmsRegion, useZapStack: boolean) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return formatRegionalizedHostname(SMS_HOSTNAME, `${useZapStack?'zt.':''}${formattedRegion}`);
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }
}

/**
 * The SMS Service exposes the following APIs:
 *  - groups
 *  - batches
 *  - inbounds
 *  - deliveryReports
 */
export class SmsService {
  public readonly groups: GroupsApi;
  public readonly deliveryReports: DeliveryReportsApi;
  public readonly batches: BatchesApi;
  public readonly inbounds: InboundsApi;

  private readonly lazyClient: LazySmsApiClient;

  /**
   * Create a new SmsService instance with its configuration. This service can be instantiated with 2 different authentication mechanisms:
   * - OAuth2: the required properties are `projectId`, `keyId` and `keySecret`
   * - API Token: the required properties are `servicePlanId` and `apiToken`
   *
   * Other supported properties:
   *  - `smsRegion`
   *  - `smsHostname`
   *  - `forceOAuth2ForSmsApi`
   *  - `forceServicePlanIdUsageForSmsApi`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    this.lazyClient = new LazySmsApiClient(params);

    this.groups = new GroupsApi(this.lazyClient);
    this.deliveryReports = new DeliveryReportsApi(this.lazyClient);
    this.batches = new BatchesApi(this.lazyClient);
    this.inbounds = new InboundsApi(this.lazyClient);
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
    this.lazyClient.sharedConfig.smsHostname = hostname;
    if (this.lazyClient.getApiClient()) {
      this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the current region for each API
   * @param {SmsRegion} region - The new region to use in the production URL
   */
  public setRegion(region: SmsRegion) {
    this.lazyClient.sharedConfig.smsRegion = region;
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
      console.error('Impossible to assign the new credentials to the SMS API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
