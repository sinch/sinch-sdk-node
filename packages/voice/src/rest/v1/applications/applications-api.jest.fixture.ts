import { ApplicationsApi } from './applications-api';
import {
  GetCallbacks,
  ListNumbersResponse,
  QueryNumberResponse,
  QueryNumberRequestData,
  GetCallbackURLsRequestData,
  GetNumbersRequestData,
  UnassignNumberRequestData,
  UpdateCallbackURLsRequestData,
  AssignNumbersRequestData,
} from '../../../models';

export class ApplicationsApiFixture implements Partial<Readonly<ApplicationsApi>> {

  /**
   * Fixture associated to function queryNumber
   */
  public queryNumber: jest.Mock<Promise<QueryNumberResponse>, [QueryNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function getCallbackURLs
   */
  public getCallbackURLs: jest.Mock<Promise<GetCallbacks>, [GetCallbackURLsRequestData]> = jest.fn();
  /**
   * Fixture associated to function getNumbers
   */
  public listNumbers: jest.Mock<Promise<ListNumbersResponse>, [GetNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function unassignNumber
   */
  public unassignNumber: jest.Mock<Promise<void>, [UnassignNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateCallbackURLs
   */
  public updateCallbackURLs: jest.Mock<Promise<void>, [UpdateCallbackURLsRequestData]> = jest.fn();
  /**
   * Fixture associated to function assignNumbers
   */
  public assignNumbers: jest.Mock<Promise<void>, [AssignNumbersRequestData]> = jest.fn();
}

