import { ListAvailableRegionsResponse } from '../../../models';
import { AvailableRegionsApi, ListAvailableRegionsRequestData } from './available-regions-api';

export class AvailableRegionsApiFixture implements Partial<Readonly<AvailableRegionsApi>> {

  /**
   * Fixture associated to function list
   */
  public list:
    jest.Mock<Promise<ListAvailableRegionsResponse>, [ListAvailableRegionsRequestData]> = jest.fn();
}

