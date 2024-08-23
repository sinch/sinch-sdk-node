import { SinchClientParameters } from '@sinch/sdk-client';
import { VerificationStatusApi } from './verification-status';
import { VerificationsApi } from './verifications';
import { StartVerificationsApi } from './start-verifications';

/**
 * The Verification Service exposes the following APIs:
 * - verifications
 * - verificationStatus
 */
export class VerificationService {
  public readonly verificationStatus: VerificationStatusApi;
  public readonly startVerifications: StartVerificationsApi;
  /** @deprecated */
  public readonly verifications: VerificationsApi;

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
    this.verificationStatus = new VerificationStatusApi(params);
    this.startVerifications = new StartVerificationsApi(params);
    this.verifications = new VerificationsApi(params);
  }

  /**
   * Update the default hostname for each API
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.verificationStatus.setHostname(hostname);
    this.startVerifications.setHostname(hostname);
    this.verifications.setHostname(hostname);
  }
}
