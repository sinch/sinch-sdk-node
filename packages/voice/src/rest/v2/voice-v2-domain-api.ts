import {
  Api,
  ApiClient,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { LazyVoiceV2ApiClient } from './voice-v2-service';

export class VoiceV2DomainApi implements Api {

  /** @internal */
  constructor(
    /** @internal */
    public readonly lazyClient: LazyVoiceV2ApiClient,
    /** @internal */
    public readonly apiName: string,
  ) {}

  /** @internal */
  public get client(): ApiClient {
    return this.lazyClient.getApiClient();
  }

  /**
   * Update the default hostname for the Voice v2 API
   * @param {string} hostname - The new hostname to use for the APIs.
   */
  /** @internal */
  public setHostname(hostname: string) {
    this.lazyClient.setHostname(hostname);
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
        'Impossible to assign the new credentials to the Voice v2 API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }

}
