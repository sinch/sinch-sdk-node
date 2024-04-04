import { SinchClientParameters } from '@sinch/sdk-client';
import { VerificationStatusApi } from './verification-status';
import { VerificationsApi } from './verifications';

export class VerificationService {
  public readonly verificationStatus: VerificationStatusApi;
  public readonly verifications: VerificationsApi;

  constructor(params: SinchClientParameters) {
    this.verificationStatus = new VerificationStatusApi(params);
    this.verifications = new VerificationsApi(params);
  }

  /**
   * Update the default hostname for each API
   *
   * @param {string} hostname - The new hostname to use for all the APIs.
   */
  public setHostname(hostname: string) {
    this.verificationStatus.setHostname(hostname);
    this.verifications.setHostname(hostname);
  }
}
