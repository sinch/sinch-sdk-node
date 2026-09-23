import { CallsApi } from './calls-api';
import {
  Call,
  CallResponse,
  CreateCallRequestData,
  GetCallByIdRequestData,
  ListCallsRequestData,
  PatchCallByIdRequestData,
  PatchCallBySessionAndNameRequestData,
} from '../../../models/v2';
import { ApiListPromise } from '@sinch/sdk-client';

export class CallsApiFixture implements Partial<Readonly<CallsApi>> {

  /**
   * Fixture associated to function start
   */
  public start: jest.Mock<Promise<CallResponse>, [CreateCallRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<Call>, [ListCallsRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Call>, [GetCallByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function interactByCallId
   */
  public interactByCallId: jest.Mock<Promise<void>, [PatchCallByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function interactByCallName
   */
  public interactByCallName: jest.Mock<Promise<void>, [PatchCallBySessionAndNameRequestData]> = jest.fn();
}
