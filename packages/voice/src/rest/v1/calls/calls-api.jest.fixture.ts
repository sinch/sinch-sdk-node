import { GetCallResponseObj } from '../../../models';
import { CallsApi, GetCallResultRequestData, ManageCallWithCallLegRequestData, UpdateCallRequestData } from './calls-api';

export class CallsApiFixture implements Partial<Readonly<CallsApi>> {

  /**
   * Fixture associated to function getCallResult
   */
  public getCallResult: jest.Mock<Promise<GetCallResponseObj>, [GetCallResultRequestData]> = jest.fn();
  /**
   * Fixture associated to function manageCallWithCallLeg
   */
  public manageCallWithCallLeg: jest.Mock<Promise<void>, [ManageCallWithCallLegRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateCall
   */
  public updateCall: jest.Mock<Promise<void>, [UpdateCallRequestData]> = jest.fn();
}

