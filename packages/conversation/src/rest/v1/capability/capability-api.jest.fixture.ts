import { LookupCapabilityResponse, Recipient } from '../../../models';
import { CapabilityApi, LookupCapabilityRequestData } from './capability-api';

export class CapabilityApiFixture implements Partial<Readonly<CapabilityApi>> {

  /**
   * Fixture associated to function lookupForContactId
   */
  public lookup: jest.Mock<
    Promise<LookupCapabilityResponse>,
    [LookupCapabilityRequestData<Recipient>]
  > = jest.fn();

}

