import { VerificationStatusApi } from './verification-status-api';
import {
  VerificationStatusResponse,
  VerificationStatusByIdRequestData,
  VerificationStatusByIdentityRequestData,
  VerificationStatusByReferenceRequestData,
} from '../../../models';

export class VerificationStatusApiFixture implements Partial<Readonly<VerificationStatusApi>> {

  /**
   * Fixture associated to function getById
   */
  public getById:
    jest.Mock<Promise<VerificationStatusResponse>, [VerificationStatusByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function getByIdentity
   */
  public getByIdentity:
    jest.Mock<Promise<VerificationStatusResponse>, [VerificationStatusByIdentityRequestData]> = jest.fn();
  /**
   * Fixture associated to function getByReference
   */
  public getByReference:
    jest.Mock<Promise<VerificationStatusResponse>, [VerificationStatusByReferenceRequestData]> = jest.fn();
}
