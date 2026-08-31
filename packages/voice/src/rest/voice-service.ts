import {
  ApplicationCredentials,
  SinchClientParameters,
  resolveClientParameters,
  UnifiedCredentials,
  VoiceRegion,
} from '@sinch/sdk-client';
import { ApplicationsApi } from './v1/applications';
import { ConferencesApi } from './v1/conferences';
import { CallsApi } from './v1/calls';
import { CalloutsApi } from './v1/callouts';
import {
  LazyVoiceApiClient,
  LazyVoiceApplicationManagementApiClient,
} from './v1/lazy-voice-api-client';
import { VoiceV2Service } from './v2';

/**
 * The Voice Service exposes the following APIs:
 * - applications
 * - callouts
 * - conferences
 * - calls
 * - v2 (Voice API v2: `v2.calls`)
 */
export class VoiceService {
  public readonly applications: ApplicationsApi;
  public readonly conferences: ConferencesApi;
  public readonly calls: CallsApi;
  public readonly callouts: CalloutsApi;
  public readonly v2: VoiceV2Service;

  /** @internal */
  public readonly lazyVoiceClient: LazyVoiceApiClient;
  /** @internal */
  public readonly lazyVoiceAppMgmtClient: LazyVoiceApplicationManagementApiClient;

  /**
   * Create a new VoiceService instance with its configuration. It needs the following parameters for authentication:
   * - `applicationKey`
   * - `applicationSecret`
   *
   * Other supported properties:
   * - `voiceRegion`
   * - `voiceHostname`
   * - `voiceApplicationManagementHostname`
   * - `projectId`, `keyId`, `keySecret` (required for Voice v2)
   * - `voiceV2Hostname` (optional Voice v2 hostname override)
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  /** @internal */
  constructor(params: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(params);
    const sharedVoiceClient = new LazyVoiceApiClient(resolvedParams);
    this.lazyVoiceClient = sharedVoiceClient;

    const sharedVoiceAppMgmtClient = new LazyVoiceApplicationManagementApiClient(resolvedParams);
    this.lazyVoiceAppMgmtClient = sharedVoiceAppMgmtClient;

    this.applications = new ApplicationsApi(sharedVoiceAppMgmtClient);
    this.conferences = new ConferencesApi(sharedVoiceClient);
    this.calls = new CallsApi(sharedVoiceClient);
    this.callouts = new CalloutsApi(sharedVoiceClient);
    this.v2 = new VoiceV2Service(resolvedParams);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(newParams);
    this.lazyVoiceClient.sharedConfig = resolvedParams;
    this.lazyVoiceClient.resetApiClient();
    this.lazyVoiceAppMgmtClient.sharedConfig = resolvedParams;
    this.lazyVoiceAppMgmtClient.resetApiClient();
    this.v2.setApiClientConfig(resolvedParams);
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
   * Update the default hostname for Voice API v2
   * @param {string} hostname - The new hostname to use for Voice v2 APIs.
   */
  public setV2Hostname(hostname: string) {
    this.v2.setHostname(hostname);
  }

  /**
   * Update the current region for each API
   * @param {VoiceRegion} region - The new region to use in the production URL
   */
  public setRegion(region: VoiceRegion) {
    this.lazyVoiceClient.sharedConfig.voiceRegion = region;
    this.lazyVoiceClient.resetApiClient();
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
    this.lazyVoiceClient.resetApiClient();
    this.lazyVoiceAppMgmtClient.resetApiClient();
    try {
      this.lazyVoiceClient.getApiClient();
      this.lazyVoiceAppMgmtClient.getApiClient();
    } catch (error) {
      this.lazyVoiceClient.sharedConfig.logger.error(
        'Impossible to assign the new credentials to the Voice API',
      );
      this.lazyVoiceClient.sharedConfig = parametersBackup;
      this.lazyVoiceAppMgmtClient.sharedConfig = parametersAppMgmtBackup;
      throw error;
    }
  }

  /**
   * Updates the OAuth2 credentials used to authenticate Voice v2 API requests.
   * @param credentials - The new OAuth2 credentials to use for Voice v2.
   */
  public setV2Credentials(credentials: Partial<UnifiedCredentials>): void {
    this.v2.setCredentials(credentials);
  }
}
