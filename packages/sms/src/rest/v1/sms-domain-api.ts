import {
  Api,
  ApiClient,
  SmsRegion,
  UnifiedCredentials,
  ServicePlanIdCredentials,
} from '@sinch/sdk-client';
import { LazySmsApiClient } from './sms-service';

export class SmsDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazySmsApiClient,
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
    this.lazyClient.sharedConfig.smsHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Update the region in the basePath
   * @param {SmsRegion} region - The new region to send the requests to
   */
  public setRegion(region: SmsRegion) {
    this.lazyClient.sharedConfig.smsRegion = region;
    this.lazyClient.resetApiClient();
  }

  /**
   * Updates the credentials used to authenticate API requests
   * @param {UnifiedCredentials | ServicePlanIdCredentials} credentials
   */
  public setCredentials(credentials: Partial<UnifiedCredentials | ServicePlanIdCredentials>) {
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
