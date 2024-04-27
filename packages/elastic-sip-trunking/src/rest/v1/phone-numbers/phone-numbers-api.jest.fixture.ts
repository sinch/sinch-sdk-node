import { PhoneNumbersApi } from './phone-numbers-api';
import { PhoneNumber, GetPhoneNumberRequestData, ListPhoneNumbersRequestData } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class PhoneNumbersApiFixture implements Partial<Readonly<PhoneNumbersApi>> {

  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<PhoneNumber>, [GetPhoneNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<PhoneNumber>, [ListPhoneNumbersRequestData]> = jest.fn();
}

