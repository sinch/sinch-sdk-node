import { QueryCapabilityResponse } from '../../../models';
import { CapabilityApi, QueryCapabilityRequestData } from './capability-api';

export class CapabilityApiFixture implements Partial<Readonly<CapabilityApi>> {

  /**
   * Fixture associated to function queryCapability
   */
  public queryCapability: jest.Mock<Promise<QueryCapabilityResponse>, [QueryCapabilityRequestData]> = jest.fn();
}

