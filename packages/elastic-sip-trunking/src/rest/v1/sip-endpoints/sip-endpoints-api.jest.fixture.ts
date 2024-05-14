import { SipEndpointsApi } from './sip-endpoints-api';
import {
  SipEndpoint,
  CreateSipEndpointRequestData,
  DeleteSipEndpointRequestData,
  ListSipEndpointsRequestData,
  GetSipEndpointByIdRequestData,
  UpdateSipEndpointRequestData,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class SipEndpointsApiFixture implements Partial<Readonly<SipEndpointsApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock< Promise<SipEndpoint>, [CreateSipEndpointRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteSipEndpointRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<SipEndpoint>, [ListSipEndpointsRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<SipEndpoint>, [GetSipEndpointByIdRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<SipEndpoint>, [UpdateSipEndpointRequestData]> = jest.fn();
}

