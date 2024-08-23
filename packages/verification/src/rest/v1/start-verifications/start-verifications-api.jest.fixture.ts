import { StartVerificationsApi } from './start-verifications-api';
import {
  StartDataVerificationRequestData,
  StartDataVerificationResponse,
  StartFlashCallVerificationRequestData,
  StartFlashCallVerificationResponse,
  StartPhoneCallVerificationRequestData,
  StartPhoneCallVerificationResponse,
  StartSmsVerificationRequestData,
  StartSmsVerificationResponse,
} from '../../../models';

export class StartVerificationsApiFixture implements Partial<Readonly<StartVerificationsApi>> {
  /**
   * Fixture associated to function startSms
   */
  public startSms: jest.Mock<Promise<
    StartSmsVerificationResponse>,
    [StartSmsVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startFlashCall
   */
  public startFlashCall: jest.Mock<
    Promise<StartFlashCallVerificationResponse>,
    [StartFlashCallVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startPhoneCall
   */
  public startPhoneCall: jest.Mock<Promise<
    StartPhoneCallVerificationResponse>,
    [StartPhoneCallVerificationRequestData]> = jest.fn();
  /**
   * Fixture associated to function startData
   */
  public startData: jest.Mock<
    Promise<StartDataVerificationResponse>,
    [StartDataVerificationRequestData]> = jest.fn();
}
