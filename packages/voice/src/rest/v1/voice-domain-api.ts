import {
  Api,
  ApiClient,
  ApplicationCredentials,
  VoiceRegion,
} from '@sinch/sdk-client';
import { LazyVoiceApiClient, LazyVoiceApplicationManagementApiClient } from './voice-service';

export class VoiceDomainApi implements Api {

  constructor(
    public readonly lazyClient: LazyVoiceApiClient | LazyVoiceApplicationManagementApiClient,
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
    if (this.apiName === 'ApplicationsApi') {
      this.lazyClient.sharedConfig.voiceApplicationManagementHostname = hostname;
    } else {
      this.lazyClient.sharedConfig.voiceHostname = hostname;
    }
    if (this.lazyClient.getApiClient()) {
      this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
    }
  }

  /**
   * Update the region in the hostname
   * @param {VoiceRegion} region - The new region to send the requests to
   */
  public setRegion(region: VoiceRegion) {
    this.lazyClient.sharedConfig.voiceRegion = region;
    this.lazyClient.resetClient();
  }

  /**
   * Updates the application credentials used to authenticate API requests
   * @param {ApplicationCredentials} credentials
   */
  public setCredentials(credentials: Partial<ApplicationCredentials>) {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Voice API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

  /**
   * @deprecated Use setCredentials instead
   */
  public setApplication(credentials: ApplicationCredentials) {
    this.setCredentials(credentials);
  }

}
