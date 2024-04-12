import {
  ActiveNumber,
  AvailableNumber,
  AvailableNumbersResponse,
  GetAvailableNumberRequestData,
  ListAvailableNumbersRequestData,
  RentAnyNumberRequestData,
  RentNumberRequestData,
} from '../../../models';
import { AvailableNumberApi } from './available-number-api';

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

