import { InitiateVerificationResponse, VerificationResponse } from '../../../models';
import { VerificationsApi, ReportVerificationByIdRequestData, ReportVerificationByIdentityRequestData, StartVerificationRequestData } from './verifications-api';

export class VerificationsApiFixture implements Partial<Readonly<VerificationsApi>> {

  /**
   * Fixture associated to function reportVerificationById
   */
  public reportById: jest.Mock<Promise<VerificationResponse>, [ReportVerificationByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function reportVerificationByIdentity
   */
  public reportByIdentity:
    jest.Mock<Promise<VerificationResponse>, [ReportVerificationByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function startVerification
   */
  public start: jest.Mock<Promise<InitiateVerificationResponse>, [StartVerificationRequestData]> = jest.fn();
}
