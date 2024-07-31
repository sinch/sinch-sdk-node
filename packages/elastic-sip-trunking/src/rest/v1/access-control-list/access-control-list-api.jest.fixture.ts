import { AccessControlListApi } from './access-control-list-api';
import {
  AccessControlList,
  IpRange,
  AddAccessControlListToTrunkRequestData,
  AddIpRangeToAccessControlListRequestData,
  CreateAccessControlListRequestData,
  DeleteAccessControlListRequestData,
  DeleteAccessControlListFromTrunkRequestData,
  DeleteIpRangeFromAccessControlListRequestData,
  ListAccessControlListRequestData,
  ListAccessControlListsForTrunkRequestData,
  ListIpRangesForAccessControlListRequestData,
  UpdateAccessControlListRequestData,
  UpdateIpRangeFromAccessControlListRequestData,
  AddAccessControlListToTrunk,
  GetAccessControlListRequestData,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class AccessControlListApiFixture implements Partial<Readonly<AccessControlListApi>> {

  /**
   * Fixture associated to function addToTrunk
   */
  public addToTrunk: jest.Mock<Promise<
    AddAccessControlListToTrunk>, [AddAccessControlListToTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function listForTrunk
   */
  public listForTrunk: jest.Mock<
    ApiListPromise<string>, [ListAccessControlListsForTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteFromTrunk
   */
  public deleteFromTrunk: jest.Mock<
    Promise<void>, [DeleteAccessControlListFromTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function addIpRange
   */
  public addIpRange: jest.Mock<
    Promise<IpRange>, [AddIpRangeToAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<
    Promise<AccessControlList>, [CreateAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<
    Promise<AccessControlList>, [GetAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<
    Promise<void>, [DeleteAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteIpRange
   */
  public deleteIpRange: jest.Mock<
    Promise<void>, [DeleteIpRangeFromAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<
    ApiListPromise<AccessControlList>, [ListAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function listIpRanges
   */
  public listIpRanges: jest.Mock<
    ApiListPromise<IpRange>, [ListIpRangesForAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<
    Promise<AccessControlList>, [UpdateAccessControlListRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateIpRange
   */
  public updateIpRange: jest.Mock<
    Promise<IpRange>, [UpdateIpRangeFromAccessControlListRequestData]> = jest.fn();
}

