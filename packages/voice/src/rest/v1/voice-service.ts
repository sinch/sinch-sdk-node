import {
  ApiFetchClient,
  ApplicationCredentials,
  buildApplicationSignedApiClientOptions,
  ConversationRegion,
  formatRegionalizedHostname,
  SinchClientParameters,
  SupportedVoiceRegion,
  VOICE_APPLICATION_MANAGEMENT_HOSTNAME,
  VOICE_HOSTNAME,
  VoiceRegion,
} from '@sinch/sdk-client';
import { ApplicationsApi } from './applications';
import { ConferencesApi } from './conferences';
import { CallsApi } from './calls';
import { CalloutsApi } from './callouts';

export class LazyVoiceApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const region = this.sharedConfig.voiceRegion ?? VoiceRegion.DEFAULT;
      if(!Object.values(SupportedVoiceRegion).includes(region as SupportedVoiceRegion)) {
        console.warn(`The region "${region}" is not known as a supported region for the Voice API`);
      }
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Voice');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.buildHostname(region);
    }
    return this.apiFetchClient;
  }

  public resetClient() {
    this.apiFetchClient = undefined;
  }

  private buildHostname(region: ConversationRegion) {
    const formattedRegion = region === VoiceRegion.DEFAULT ? region : `-${region}`;
    return this.sharedConfig.voiceHostname ?? formatRegionalizedHostname(VOICE_HOSTNAME, formattedRegion);
  }

}

export class LazyVoiceApplicationManagementApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Voice');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname
        = this.sharedConfig.voiceApplicationManagementHostname ?? VOICE_APPLICATION_MANAGEMENT_HOSTNAME;
    }
    return this.apiFetchClient;
  }

  public resetClient() {
    this.apiFetchClient = undefined;
  }
}

/**
 * The Voice Service exposes the following APIs:
 * - applications
 * - callouts
 * - conferences
 * - calls
 */
export class VoiceService {
  public readonly applications: ApplicationsApi;
  public readonly conferences: ConferencesApi;
  public readonly calls: CallsApi;
  public readonly callouts: CalloutsApi;

  private readonly lazyVoiceClient: LazyVoiceApiClient;
  private readonly lazyVoiceAppMgmtClient: LazyVoiceApplicationManagementApiClient;

  /**
   * Create a new VoiceService instance with its configuration. It needs the following parameters for authentication:
   * - `applicationKey`
   * - `applicationSecret`
   *
   * Other supported properties:
   * - `voiceRegion`
   * - `voiceHostname`
   * - `voiceApplicationManagementHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    const sharedVoiceClient = new LazyVoiceApiClient(params);
    this.lazyVoiceClient = sharedVoiceClient;

    const sharedVoiceAppMgmtClient = new LazyVoiceApplicationManagementApiClient(params);
    this.lazyVoiceAppMgmtClient = sharedVoiceAppMgmtClient;

    this.applications = new ApplicationsApi(sharedVoiceAppMgmtClient);
    this.conferences = new ConferencesApi(sharedVoiceClient);
    this.calls = new CallsApi(sharedVoiceClient);
    this.callouts = new CalloutsApi(sharedVoiceClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    this.lazyVoiceClient.sharedConfig = newParams;
    this.lazyVoiceClient.resetClient();
    this.lazyVoiceAppMgmtClient.sharedConfig = newParams;
    this.lazyVoiceAppMgmtClient.resetClient();
  }

  /**
   * Update the default hostname for each API except Applications
   * @param {string} hostname - The new hostname to use for all the APIs except Applications.
   */
  public setHostname(hostname: string) {
    this.lazyVoiceClient.sharedConfig.voiceHostname = hostname;
    this.lazyVoiceClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Update the default hostname for the Applications API
   * @param {string} hostname - The new hostname to use for the Applications API.
   */
  public setApplicationsManagementHostname(hostname: string) {
    this.lazyVoiceAppMgmtClient.sharedConfig.voiceApplicationManagementHostname = hostname;
    this.lazyVoiceAppMgmtClient.getApiClient().apiClientOptions.hostname = hostname;
  }

  /**
   * Update the current region for each API
   * @param {VoiceRegion} region - The new region to use in the production URL
   */
  public setRegion(region: VoiceRegion) {
    this.lazyVoiceClient.sharedConfig.voiceRegion = region;
    this.lazyVoiceClient.resetClient();
  }

  /**
   * Updates the credentials used to authenticate API requests.
   * @param credentials - The new credentials to use for the APIs.
   */
  public setCredentials(credentials: Partial<ApplicationCredentials>): void {
    const parametersBackup = { ...this.lazyVoiceClient.sharedConfig };
    const parametersAppMgmtBackup = { ...this.lazyVoiceAppMgmtClient.sharedConfig };
    this.lazyVoiceClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyVoiceAppMgmtClient.sharedConfig = {
      ...parametersAppMgmtBackup,
      ...credentials,
    };
    this.lazyVoiceClient.resetClient();
    this.lazyVoiceAppMgmtClient.resetClient();
    try {
      this.lazyVoiceClient.getApiClient();
      this.lazyVoiceAppMgmtClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Voice API');
      this.lazyVoiceClient.sharedConfig = parametersBackup;
      this.lazyVoiceAppMgmtClient.sharedConfig = parametersAppMgmtBackup;
      throw error;
    }
  }
}
