import { NumberLookupApi } from './number-lookup-api';
import { NumberLookupRequestData, NumberLookupResponse } from '../../../models';

export class NumberLookupApiFixture implements Partial<Readonly<NumberLookupApi>> {
  /**
   * Fixture associated to function numberLookup
   */
  public lookup: jest.Mock<Promise<NumberLookupResponse>, [NumberLookupRequestData]> = jest.fn();
}
