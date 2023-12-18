import { ActiveNumber, AvailableNumber, AvailableNumbersResponse } from '../../../models';
import {
  AvailableNumberApi,
  GetAvailableNumberRequestData,
  ListAvailableNumbersRequestData,
  RentAnyNumberRequestData,
  RentNumberRequestData,
} from './available-number-api';

export class AvailableNumberApiFixture implements Partial<Readonly<AvailableNumberApi>> {

  /**
   * Fixture associated to function checkAvailability
   */
  public checkAvailability: jest.Mock<Promise<AvailableNumber>, [GetAvailableNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list:
    jest.Mock<Promise<AvailableNumbersResponse>, [ListAvailableNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function rentAny
   */
  public rentAny: jest.Mock<Promise<ActiveNumber>, [RentAnyNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function rent
   */
  public rent: jest.Mock<Promise<ActiveNumber>, [RentNumberRequestData]> = jest.fn();
}

