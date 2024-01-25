import { QueryCapabilityResponse } from '../../../models';
import { CapabilityApi, LookupCapabilityRequestData } from './capability-api';

export class CapabilityApiFixture implements Partial<Readonly<CapabilityApi>> {

  /**
   * Fixture associated to function lookup
   */
  public lookup: jest.Mock<Promise<QueryCapabilityResponse>, [LookupCapabilityRequestData]> = jest.fn();
}

