import { ApiListPromise } from '@sinch/sdk-client';
import { ServicesApi } from './services-api';
import {
  CreateServiceRequestData,
  DeleteServiceRequestData,
  GetServiceRequestData,
  ListServicesRequestData,
  ServiceResponse,
  ServiceShortResponse,
  UpdateServiceRequestData,
} from '../../../models/v2';

export class ServicesApiFixture implements Partial<Readonly<ServicesApi>> {

  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ServiceShortResponse>, [ListServicesRequestData]> = jest.fn();
  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<ServiceResponse>, [CreateServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ServiceResponse>, [GetServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ServiceResponse>, [UpdateServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteServiceRequestData]> = jest.fn();
}
