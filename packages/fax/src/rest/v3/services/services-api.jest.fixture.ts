import { ServicePhoneNumber, ServiceResponse } from '../../../models';
import { ServicesApi, CreateServiceRequestData, GetServiceRequestData, ListNumbersForServiceRequestData, ListServicesRequestData, RemoveServiceRequestData, UpdateServiceRequestData } from './services-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ServicesApiFixture implements Partial<Readonly<ServicesApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<ServiceResponse>, [CreateServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ServiceResponse>, [GetServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function listNumbers
   */
  public listNumbers:
    jest.Mock<ApiListPromise<ServicePhoneNumber>, [ListNumbersForServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ServiceResponse>, [ListServicesRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [RemoveServiceRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ServiceResponse>, [UpdateServiceRequestData]> = jest.fn();
}

