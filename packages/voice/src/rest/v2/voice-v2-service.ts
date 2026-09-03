import {
  ApiFetchClient,
  buildOAuth2ApiClientOptions,
  LazyApiClient,
  resolveClientParameters,
  SinchClientParameters,
  UnifiedCredentials,
} from '@sinch/sdk-client';
import { CallsApi } from './calls';

/** Default global hostname from the Voice v2 OAS `servers` list. */
export const DEFAULT_VOICE_V2_HOSTNAME = 'https://voice.api.sinch.com';

/** @internal */
export class LazyVoiceV2ApiClient extends LazyApiClient {
  public hostnameOverride?: string;

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildOAuth2ApiClientOptions(this.sharedConfig, 'Voice v2');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.resolveHostname();
    }
    return this.apiFetchClient;
  }

  public setHostname(hostname: string): void {
    this.hostnameOverride = hostname;
    if (this.apiFetchClient) {
      this.apiFetchClient.apiClientOptions.hostname = hostname;
    }
  }

  private resolveHostname(): string {
    return this.hostnameOverride ?? this.sharedConfig.voiceV2Hostname ?? DEFAULT_VOICE_V2_HOSTNAME;
  }
}

/**
 * The Voice v2 Service exposes the following APIs:
 * - calls
 */
export class VoiceV2Service {
  public readonly calls: CallsApi;

  /** @internal */
  public readonly lazyClient: LazyVoiceV2ApiClient;

  /** @internal */
  constructor(params: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(params);
    this.lazyClient = new LazyVoiceV2ApiClient(resolvedParams);
    if (resolvedParams.voiceV2Hostname) {
      this.lazyClient.hostnameOverride = resolvedParams.voiceV2Hostname;
    }
    this.calls = new CallsApi(this.lazyClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(newParams);
    this.lazyClient.sharedConfig = resolvedParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for Voice v2 APIs
   * @param {string} hostname - The new hostname to use for all Voice v2 APIs.
   */
  public setHostname(hostname: string): void {
    this.lazyClient.setHostname(hostname);
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
        'Impossible to assign the new credentials to the Voice v2 API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
