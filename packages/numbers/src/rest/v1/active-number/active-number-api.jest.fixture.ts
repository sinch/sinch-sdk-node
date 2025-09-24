import {
  ActiveNumber,
  DeprovisionEmergencyAddressRequestData,
  EmergencyAddress,
  GetActiveNumberRequestData,
  GetEmergencyAddressRequestData,
  ListActiveNumbersRequestData,
  ProvisionEmergencyAddressRequestData,
  ReleaseNumberRequestData,
  UpdateActiveNumberRequestData,
  ValidateEmergencyAddressResponse,
  ValidateEmergencyAddressRequestData,
} from '../../../models';
import { ActiveNumberApi } from './active-number-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ActiveNumberApiFixture implements Partial<Readonly<ActiveNumberApi>> {

  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ActiveNumber>, [GetActiveNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ActiveNumber>, [ListActiveNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function release
   */
  public release: jest.Mock<Promise<ActiveNumber>, [ReleaseNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ActiveNumber>, [UpdateActiveNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function deprovisionEmergencyAddress
   */
  public deprovisionEmergencyAddress: jest.Mock<Promise<void>, [DeprovisionEmergencyAddressRequestData]> = jest.fn();
  /**
   * Fixture associated to function getEmergencyAddress
   */
  public getEmergencyAddress: jest.Mock<Promise<EmergencyAddress>, [GetEmergencyAddressRequestData]> = jest.fn();
  /**
   * Fixture associated to function provisionEmergencyAddress
   */
  public provisionEmergencyAddress: jest.Mock<Promise<EmergencyAddress>,
    [ProvisionEmergencyAddressRequestData]> = jest.fn();
  /**
   * Fixture associated to function validateEmergencyAddress
   */
  public validateEmergencyAddress: jest.Mock<Promise<ValidateEmergencyAddressResponse>,
    [ValidateEmergencyAddressRequestData]> = jest.fn();
}

