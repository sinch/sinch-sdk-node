import { CallsApi } from './calls-api';
import {
  GetCallInformation,
  GetCallResultRequestData,
  ManageWithCallLegRequestData,
  UpdateCallRequestData,
} from '../../../models';

export class CallsApiFixture implements Partial<Readonly<CallsApi>> {

  /**
   * Fixture associated to function getCallResult
   */
  public get: jest.Mock<Promise<GetCallInformation>, [GetCallResultRequestData]> = jest.fn();
  /**
   * Fixture associated to function manageCallWithCallLeg
   */
  public manageWithCallLeg: jest.Mock<Promise<void>, [ManageWithCallLegRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateCall
   */
  public update: jest.Mock<Promise<void>, [UpdateCallRequestData]> = jest.fn();
}
