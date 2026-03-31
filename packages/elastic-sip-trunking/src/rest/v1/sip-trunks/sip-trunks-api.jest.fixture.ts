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
  CredentialListIds,
  AddCredentialListIdsToTrunkRequestData,
  DeleteCredentialListFromTrunkRequestData,
  ListCredentialListsForTrunkRequestData,
  UpdateCredentialListIdsForTrunkRequestData,
  CredentialList,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class SipTrunksApiFixture implements Partial<Readonly<SipTrunksApi>> {

  /**
   * Fixture associated with function addAccessControlList
   */
  public addAccessControlList: jest.Mock<
    Promise<AddAccessControlListToTrunk>,
    [AddAccessControlListToTrunkRequestData]
  > = jest.fn();
  /**
   * Fixture associated with function addCredentialLists
   */
  public addCredentialLists: jest.Mock<
    Promise<CredentialListIds>,
    [AddCredentialListIdsToTrunkRequestData]
  > = jest.fn();
  /**
   * Fixture associated with function create
   */
  public create: jest.Mock<Promise<SipTrunk>, [CreateSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function deleteAccessControlList
   */
  public deleteAccessControlList: jest.Mock<Promise<void>, [DeleteAccessControlListFromTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function deleteCredentialList
   */
  public deleteCredentialList: jest.Mock<Promise<void>, [DeleteCredentialListFromTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function listAccessControlLists
   */
  public listAccessControlLists: jest.Mock<
    ApiListPromise<string>,
    [ListAccessControlListsForTrunkRequestData]
  > = jest.fn();
  /**
   * Fixture associated with function get
   */
  public get: jest.Mock<Promise<SipTrunk>, [GetSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function list
   */
  public list: jest.Mock<ApiListPromise<SipTrunk>, [ListSipTrunksRequestData]> = jest.fn();
  /**
   * Fixture associated with function listCredentialLists
   */
  public listCredentialLists: jest.Mock<
    ApiListPromise<CredentialList>, [ListCredentialListsForTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function update
   */
  public update: jest.Mock<Promise<SipTrunk>, [UpdateSipTrunkRequestData]> = jest.fn();
  /**
   * Fixture associated with function updateCredentialLists
   */
  public updateCredentialLists: jest.Mock<
    Promise<CredentialListIds>, [UpdateCredentialListIdsForTrunkRequestData]> = jest.fn();
}

