import { CreateGroupRequest } from '../../create-group-request';
import { ReplaceGroupRequest } from '../../replace-group-request';
import { UpdateGroupRequest } from '../../update-group-request';

export interface CreateGroupRequestData {
  /**  */
  'createGroupRequestBody'?: CreateGroupRequest;
}
export interface DeleteGroupRequestData {
  /** ID of a group that you are interested in getting. */
  'group_id': string;
}
export interface ListMembersRequestData {
  /** ID of a group that you are interested in getting. */
  'group_id': string;
}
export interface ListGroupsRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page. */
  'page_size'?: number;
}
export interface ReplaceGroupRequestData {
  /** ID of a group that you are interested in getting. */
  'group_id': string;
  /**  */
  'replaceGroupRequestBody'?: ReplaceGroupRequest;
}
export interface GetGroupRequestData {
  /** ID of a group that you are interested in getting. */
  'group_id': string;
}
export interface UpdateGroupRequestData {
  /** ID of a group that you are interested in getting. */
  'group_id': string;
  /**  */
  'updateGroupRequestBody'?: UpdateGroupRequest;
}
