import { CallsApi } from './calls-api';
import {
  CallResponse,
  CreateCallRequestData,
} from '../../../models/v2';

export class CallsApiFixture implements Partial<Readonly<CallsApi>> {

  /**
   * Fixture associated to function start
   */
  public start: jest.Mock<Promise<CallResponse>, [CreateCallRequestData]> = jest.fn();
}
