import {
  ApiFetchClient,
  ApplicationCredentials,
  buildApplicationSignedApiClientOptions,
  SinchClientParameters,
  VERIFICATION_HOSTNAME,
  LazyApiClient,
  resolveClientParameters,
} from '@sinch/sdk-client';
import { VerificationStatusApi } from './verification-status';
import { VerificationsApi } from './verifications';

/** @internal */
export class LazyVerificationApiClient extends LazyApiClient {
  public getApiClient(): ApiFetchClient {
    if (!this.apiFetchClient) {
      const apiClientOptions = buildApplicationSignedApiClientOptions(this.sharedConfig, 'Verification');
      this.apiFetchClient = new ApiFetchClient(apiClientOptions);
      this.apiFetchClient.apiClientOptions.hostname = this.sharedConfig.verificationHostname ?? VERIFICATION_HOSTNAME;
    }
    return this.apiFetchClient;
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

  /** @internal */
  public readonly lazyClient: LazyVerificationApiClient;

  /**
   * Create a new VerificationService instance with its configuration. It needs the following parameters for authentication:
   * - `applicationKey`
   * - `applicationSecret`
   *
   * Other supported properties:
   * - `verificationHostname`
   * @param {SinchClientParameters} params - an Object containing the necessary properties to initialize the service
   */
  /** @internal */
  constructor(params: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(params);
    this.lazyClient = new LazyVerificationApiClient(resolvedParams);

    this.verificationStatus = new VerificationStatusApi(this.lazyClient);
    this.verifications = new VerificationsApi(this.lazyClient);
  }

  public setApiClientConfig(newParams: SinchClientParameters) {
    const resolvedParams = resolveClientParameters(newParams);
    this.lazyClient.sharedConfig = resolvedParams;
    this.lazyClient.resetApiClient();
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.lazyClient.sharedConfig.verificationHostname = hostname;
    this.lazyClient.getApiClient().apiClientOptions.hostname = hostname;
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
      this.lazyClient.sharedConfig.logger.error(
        'Impossible to assign the new credentials to the Verification API',
      );
      this.lazyClient.sharedConfig = parametersBackup;
      throw error;
    }
  }
}
