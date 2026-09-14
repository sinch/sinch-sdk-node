import { BatchesApi } from './batches-api';
import {
  BatchDetails,
  BatchSummary,
  GetBatchCallSummaryRequestData,
  GetBatchDetailsRequestData,
  StartBatchRequestData,
  StartBatchResponse,
  StopBatchProcessingRequestData,
} from '../../../models/v2';

export class BatchesApiFixture implements Partial<Readonly<BatchesApi>> {

  /**
   * Fixture associated to function start
   */
  public start: jest.Mock<Promise<StartBatchResponse>, [StartBatchRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<BatchSummary>, [GetBatchCallSummaryRequestData]> = jest.fn();
  /**
   * Fixture associated to function getDetails
   */
  public getDetails: jest.Mock<Promise<BatchDetails>, [GetBatchDetailsRequestData]> = jest.fn();
  /**
   * Fixture associated to function stop
   */
  public stop: jest.Mock<Promise<void>, [StopBatchProcessingRequestData]> = jest.fn();
}
