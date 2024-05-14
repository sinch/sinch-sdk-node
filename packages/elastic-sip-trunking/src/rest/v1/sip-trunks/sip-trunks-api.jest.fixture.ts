import { SipTrunksApi } from './sip-trunks-api';
import {
  AddAccessControlListToTrunk,
  SipTrunk,
  AddAccessControlListToTrunkRequestData,
  CreateSipTrunkRequestData,
  DeleteAccessControlListFromTrunkRequestData,
  DeleteSipTrunkRequestData,
  ListAccessControlListsForTrunkRequestData,
  GetSipTrunkRequestData,
  ListSipTrunksRequestData,
  UpdateSipTrunkRequestData,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class SipTrunksApiFixture implements Partial<Readonly<SipTrunksApi>> {

  /**
   * Fixture associated to function addAccessControlList
   */
  public addAccessControlList: jest.Mock<
    Promise<AddAccessControlListToTrunk>,
    [AddAccessControlListToTrunkRequestData]
  > = jest.fn();
  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<SipTrunk>, [CreateSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteAccessControlListFromTrunk
   */
  public deleteAccessControlList: jest.Mock<Promise<void>, [DeleteAccessControlListFromTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteSipTrunk
   */
  public delete: jest.Mock<Promise<void>, [DeleteSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function getAccessControlListsForTrunk
   */
  public listAccessControlLists: jest.Mock<
    ApiListPromise<string>,
    [ListAccessControlListsForTrunkRequestData]
  > = jest.fn();
  /**
   * Fixture associated to function getSipTrunkById
   */
  public get: jest.Mock<Promise<SipTrunk>, [GetSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated to function getSipTrunks
   */
  public list: jest.Mock<ApiListPromise<SipTrunk>, [ListSipTrunksRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateSipTrunk
   */
  public update: jest.Mock<Promise<SipTrunk>, [UpdateSipTrunkRequestData]> = jest.fn();
}

