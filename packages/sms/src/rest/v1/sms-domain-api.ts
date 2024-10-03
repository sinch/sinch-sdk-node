import {
  Api,
  ApiClient,
  ApiFetchClient,
  buildFlexibleOAuth2OrApiTokenApiClientOptions,
  formatRegionalizedHostname,
  SinchClientParameters,
  SmsRegion,
  SMS_HOSTNAME,
  UnifiedCredentials,
  ServicePlanIdCredentials,
  SupportedSmsRegion,
} from '@sinch/sdk-client';

export class SmsDomainApi implements Api {
  public readonly apiName: string;
  public client?: ApiClient;
  private sinchClientParameters: SinchClientParameters;

  constructor(sinchClientParameters: SinchClientParameters, apiName: string) {
    this.sinchClientParameters = sinchClientParameters;
    this.apiName = apiName;
  }

  /**
   * Update the default hostname for the API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  public setHostname(hostname: string) {
    try {
      this.client = this.getSinchClient();
      this.client.apiClientOptions.hostname = hostname;
    } catch (error) {
      console.error('Impossible to set a new hostname, the Application credentials need to be provided first.');
      throw error;
    }
  }

  /**
   * Update the region in the basePath
   * @param {SmsRegion} region - The new region to send the requests to
   */
  public setRegion(region: SmsRegion) {
    this.sinchClientParameters.smsRegion = region;
    if (this.client) {
      const useZapStack = !this.client.apiClientOptions.useServicePlanId;
      this.client.apiClientOptions.hostname = this.buildHostname(region, useZapStack);
    }
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials | ServicePlanIdCredentials} credentials
   */
  public setCredentials(credentials: UnifiedCredentials | ServicePlanIdCredentials) {
    const parametersBackup = { ...this.sinchClientParameters };
    this.sinchClientParameters = {
      ...parametersBackup,
      ...credentials,
    };
    this.resetApiClient();
    try {
      this.getSinchClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the SMS API');
      this.sinchClientParameters = parametersBackup;
      throw error;
    }
  }

  private resetApiClient() {
    this.client = undefined;
  }

  /**
   * Checks the configuration parameters are ok and initialize the API client. Once initialized, the same instance will
   * be returned for the subsequent API calls (singleton pattern)
   * @return {ApiClient} the API Client or throws an error in case the configuration parameters are not ok
   * @private
   */
  public getSinchClient(): ApiClient {
    if (!this.client) {
      const region = this.sinchClientParameters.smsRegion ?? SmsRegion.UNITED_STATES;
      if(!Object.values(SupportedSmsRegion).includes(region as SupportedSmsRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the SMS API`);
      }
      const apiClientOptions = buildFlexibleOAuth2OrApiTokenApiClientOptions(this.sinchClientParameters);
      this.client = new ApiFetchClient(apiClientOptions);
      const useZapStack = !this.client.apiClientOptions.useServicePlanId;
      this.client.apiClientOptions.hostname = this.sinchClientParameters.smsHostname
        ?? this.buildHostname(region, useZapStack);
    }
    return this.client;
  }

  private buildHostname(region: SmsRegion, useZapStack: boolean) {
    const formattedRegion = region !== '' ? `${region}.` : '';
    return formatRegionalizedHostname(SMS_HOSTNAME, `${useZapStack?'zt.':''}${formattedRegion}`);
  }

}
