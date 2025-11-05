import {
  ApiFetchClient,
  ApplicationCredentials,
  buildApplicationSignedApiClientOptions,
  SinchClientParameters,
  VERIFICATION_HOSTNAME,
} from '@sinch/sdk-client';
import { VerificationStatusApi } from './verification-status';
import { VerificationsApi } from './verifications';

export class LazyVerificationApiClient {
  private apiFetchClient?: ApiFetchClient;
  constructor(public sharedConfig: SinchClientParameters) {}

  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Verification');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.verificationHostname ?? VERIFICATION_HOSTNAME;
    }
    return this.apiFetchClient;
  }

  public resetApiClient() {
    this.apiFetchClient = undefined;
  }
}

/**
 * The Verification Service exposes the following APIs:
 * - verifications
 * - verificationStatus
 */
export class VerificationService {
  public readonly verificationStatus: VerificationStatusApi;
  public readonly verifications: VerificationsApi;

  private readonly lazyClient: LazyVerificationApiClient;

  /**
   * Create a new VerificationService instance with its configuration. It needs the following parameters for authentication:
   * - `applicationKey`
   * - `applicationSecret`
   *
   * Other supported properties:
   * - `verificationHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  constructor(params: SinchClientParameters) {
    this.lazyClient = new LazyVerificationApiClient(params);

    this.verificationStatus = new VerificationStatusApi(this.lazyClient);
    this.verifications = new VerificationsApi(this.lazyClient);
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
    this.verificationStatus.setHostname(hostname);
    this.verifications.setHostname(hostname);
  }

  public setCredentials(credentials: Partial<ApplicationCredentials>): void {
    const parametersBackup = { ...this.lazyClient.sharedConfig };
    this.lazyClient.sharedConfig = {
      ...parametersBackup,
      ...credentials,
    };
    this.lazyClient.resetApiClient();
    try {
      this.lazyClient.getApiClient();
    } catch (error) {
      console.error('Impossible to assign the new credentials to the Verification API');
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
