import { PhoneNumbersApi } from './phone-numbers-api';
import {
  GetPhoneNumberRequestData,
  ListPhoneNumbersRequestData,
  PhoneNumber,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class PhoneNumbersApiFixture implements Partial<Readonly<PhoneNumbersApi>> {

  /**
   * Fixture associated with function get
   */
  public get: jest.Mock<Promise<PhoneNumber>, [GetPhoneNumberRequestData]> = jest.fn();
  /**
   * Fixture associated with function list
   */
  public list: jest.Mock<ApiListPromise<PhoneNumber>, [ListPhoneNumbersRequestData | undefined]> = jest.fn();
}
