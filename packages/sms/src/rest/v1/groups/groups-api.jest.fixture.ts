import { GroupsApi } from './groups-api';
import {
  Group,
  CreateGroupRequestData,
  DeleteGroupRequestData,
  ListMembersRequestData,
  ListGroupsRequestData,
  ReplaceGroupRequestData,
  GetGroupRequestData,
  UpdateGroupRequestData,
} from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class GroupsApiFixture implements Partial<Readonly<GroupsApi>> {

  /**
   * Fixture associated to function createGroup
   */
  public create: jest.Mock<Promise<Group>, [CreateGroupRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteGroup
   */
  public delete: jest.Mock<Promise<void>, [DeleteGroupRequestData]> = jest.fn();
  /**
   * Fixture associated to function getMembers
   */
  public listMembers: jest.Mock<Promise<string[]>, [ListMembersRequestData]> = jest.fn();
  /**
   * Fixture associated to function listGroups
   */
  public list: jest.Mock<ApiListPromise<Group>, [ListGroupsRequestData]> = jest.fn();
  /**
   * Fixture associated to function replaceGroup
   */
  public replace: jest.Mock<Promise<Group>, [ReplaceGroupRequestData]> = jest.fn();
  /**
   * Fixture associated to function retrieveGroup
   */
  public get: jest.Mock<Promise<Group>, [GetGroupRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateGroup
   */
  public update: jest.Mock<Promise<Group>, [UpdateGroupRequestData]> = jest.fn();
}
