import { CallsHistoryApi } from './calls-history-api';
import { Call, ExportCallRecordsRequestData, FindCallsRequestData } from '../../../models';
import { ApiListPromise, FileData } from '@sinch/sdk-client';

export class CallsHistoryApiFixture implements Partial<Readonly<CallsHistoryApi>> {

  /**
   * Fixture associated with function export
   */
  public export: jest.Mock<Promise<FileData>, [ExportCallRecordsRequestData]> = jest.fn();
  /**
   * Fixture associated with function find
   */
  public find: jest.Mock<ApiListPromise<Call>, [FindCallsRequestData]> = jest.fn();
}
