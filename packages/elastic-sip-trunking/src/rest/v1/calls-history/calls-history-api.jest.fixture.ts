import { CallsHistoryApi } from './calls-history-api';
import { Call, FindCallsRequestData } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class CallsHistoryApiFixture implements Partial<Readonly<CallsHistoryApi>> {

  /**
   * Fixture associated to function find
   */
  public find: jest.Mock<ApiListPromise<Call>, [FindCallsRequestData]> = jest.fn();
}

