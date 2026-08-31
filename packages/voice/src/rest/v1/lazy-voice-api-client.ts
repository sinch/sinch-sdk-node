import {
  ApiFetchClient,
  buildApplicationSignedApiClientOptions,
  ConversationRegion,
  formatRegionalizedHostname,
  SupportedVoiceRegion,
  LazyApiClient,
  VOICE_APPLICATION_MANAGEMENT_HOSTNAME,
  VOICE_HOSTNAME,
  VoiceRegion,
} from '@sinch/sdk-client';

/** @internal */
export class LazyVoiceApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const region = this.sharedConfig.voiceRegion ?? VoiceRegion.DEFAULT;
      if(!Object.values(SupportedVoiceRegion).includes(region as SupportedVoiceRegion)) {
        this.sharedConfig.logger.warn(
          `The region "${region}" is not known as a supported region for the Voice API`,
        );
      }
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Voice');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.apiFetchClient;
  }

  private buildHostname(region: ConversationRegion) {
    const formattedRegion = region === VoiceRegion.DEFAULT ? region : `-${region}`;
    return this.sharedConfig.voiceHostname ?? formatRegionalizedHostname(VOICE_HOSTNAME, formattedRegion);
  }

}

/** @internal */
export class LazyVoiceApplicationManagementApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Voice');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname
        = this.sharedConfig.voiceApplicationManagementHostname ?? VOICE_APPLICATION_MANAGEMENT_HOSTNAME;
    }
    return this.apiFetchClient;
  }
}
