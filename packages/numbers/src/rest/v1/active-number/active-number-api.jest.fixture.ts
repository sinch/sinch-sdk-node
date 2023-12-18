import { ActiveNumber } from '../../../models';
import {
  ActiveNumberApi,
  GetActiveNumberRequestData,
  ListActiveNumbersRequestData,
  ReleaseNumberRequestData,
  UpdateActiveNumberRequestData,
} from './active-number-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ActiveNumberApiFixture implements Partial<Readonly<ActiveNumberApi>> {

  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ActiveNumber>, [GetActiveNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ActiveNumber>, [ListActiveNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function release
   */
  public release: jest.Mock<Promise<ActiveNumber>, [ReleaseNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ActiveNumber>, [UpdateActiveNumberRequestData]> = jest.fn();
}

