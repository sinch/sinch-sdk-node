import { CountryPermissionsApi } from './country-permissions-api';
import {
  CountryPermission,
  GetCountryPermissionRequestData,
  ListCountryPermissionsRequestData,
  ListCountryPermissionsResponse,
  UpdateCountryPermissionRequestData,
} from '../../../models';

export class CountryPermissionsApiFixture implements Partial<Readonly<CountryPermissionsApi>> {

  /**
   * Fixture associated to function getCountryPermission
   */
  public get: jest.Mock<Promise<CountryPermission>, [GetCountryPermissionRequestData]> = jest.fn();
  /**
   * Fixture associated to function getCountryPermissions
   */
  public list: jest.Mock<
    Promise<ListCountryPermissionsResponse>,
    [ListCountryPermissionsRequestData]
  > = jest.fn();
  /**
   * Fixture associated to function updateCountryPermission
   */
  public update: jest.Mock<
    Promise<CountryPermission>,
    [UpdateCountryPermissionRequestData]
  > = jest.fn();
}

