import { CapabilityApi } from './capability-api';
import {
  LookupCapabilityRequestData,
  LookupCapabilityResponse,
  Recipient,
} from '../../../models';

export class CapabilityApiFixture implements Partial<Readonly<CapabilityApi>> {

  /**
   * Fixture associated to function lookupForContactId
   */
  public lookup: jest.Mock<
    Promise<LookupCapabilityResponse>,
    [LookupCapabilityRequestData<Recipient>]
  > = jest.fn();

}
