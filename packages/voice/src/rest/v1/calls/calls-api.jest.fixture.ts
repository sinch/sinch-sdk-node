import { CallObject } from '../../../models';
import { CallsApi, GetCallResultRequestData, ManageWithCallLegRequestData, UpdateCallRequestData } from './calls-api';

export class CallsApiFixture implements Partial<Readonly<CallsApi>> {

  /**
   * Fixture associated to function getCallResult
   */
  public get: jest.Mock<Promise<CallObject>, [GetCallResultRequestData]> = jest.fn();
  /**
   * Fixture associated to function manageCallWithCallLeg
   */
  public manageWithCallLeg: jest.Mock<Promise<void>, [ManageWithCallLegRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateCall
   */
  public update: jest.Mock<Promise<void>, [UpdateCallRequestData]> = jest.fn();
}

