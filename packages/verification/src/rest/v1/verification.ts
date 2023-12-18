/**
 * Domain: verification
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */
import { SinchClientParameters } from '@sinch/sdk-client';
import { VerificationStatusApi } from './verification-status';
import { VerificationsApi } from './verifications';

export class Verification {
  public readonly verificationStatus: VerificationStatusApi;
  public readonly verifications: VerificationsApi;

  constructor(params: SinchClientParameters) {
    this.verificationStatus = new VerificationStatusApi(params);
    this.verifications = new VerificationsApi(params);
  }

  /**
   * Update the default basePath for each API
   *
   * @param {string} basePath - The new base path to use for all the APIs.
   */
  public setBasePath(basePath: string) {
    this.verificationStatus.setBasePath(basePath);
    this.verifications.setBasePath(basePath);
  }
}
