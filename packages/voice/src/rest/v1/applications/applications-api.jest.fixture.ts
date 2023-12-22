import { GetCallbacks, GetNumbersResponseObj, GetQueryNumber } from '../../../models';
import { ApplicationsApi, QueryNumberRequestData, GetCallbackURLsRequestData, GetNumbersRequestData, UnassignNumberRequestData, UpdateCallbackURLsRequestData, UpdateNumbersRequestData } from './applications-api';

export class ApplicationsApiFixture implements Partial<Readonly<ApplicationsApi>> {

  /**
   * Fixture associated to function queryNumber
   */
  public queryNumber: jest.Mock<Promise<GetQueryNumber>, [QueryNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function getCallbackURLs
   */
  public getCallbackURLs: jest.Mock<Promise<GetCallbacks>, [GetCallbackURLsRequestData]> = jest.fn();
  /**
   * Fixture associated to function getNumbers
   */
  public getNumbers: jest.Mock<Promise<GetNumbersResponseObj>, [GetNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function unassignNumber
   */
  public unassignNumber: jest.Mock<Promise<void>, [UnassignNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateCallbackURLs
   */
  public updateCallbackURLs: jest.Mock<Promise<void>, [UpdateCallbackURLsRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateNumbers
   */
  public updateNumbers: jest.Mock<Promise<void>, [UpdateNumbersRequestData]> = jest.fn();
}

