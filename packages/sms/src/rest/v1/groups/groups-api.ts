import {
  CreateGroupResponse,
  CreateGroupRequest,
  ReplaceGroupRequest,
  UpdateGroupRequest,
  GroupResponse,
  ReplaceGroupResponse,
  UpdateGroupResponse,
} from '../../../models';
import {
  RequestBody,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  SinchClientParameters,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { SmsApi } from '../sms-api';

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

export class GroupsApi extends SmsApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'GroupsApi');
  }

  /**
   * Create a group
   * A group is a set of phone numbers (MSISDNs) that can be used as a target in the &#x60;send_batch_msg&#x60; operation. An MSISDN can only occur once in a group and any attempts to add a duplicate would be ignored but not rejected.
   * @param { CreateGroupRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateGroupRequestData): Promise<CreateGroupResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateGroupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createGroupRequestBody'] ? JSON.stringify(data['createGroupRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CreateGroupResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateGroup',
    });
  }

  /**
   * Delete a group
   * This operation deletes the group with the provided group ID.
   * @param { DeleteGroupRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteGroupRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteGroupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups/${data['group_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteGroup',
    });
  }

  /**
   * Get phone numbers for a group
   * This operation retrieves the members of the group with the provided group ID.
   * @param { ListMembersRequestData } data - The data to provide to the API call.
   */
  public async listMembers(data: ListMembersRequestData): Promise<string[]> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListMembersRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups/${data['group_id']}/members`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<string[]>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetMembers',
    });
  }

  /**
   * List Groups
   * With the list operation you can list all groups that you have created. This operation supports pagination.  Groups are returned in reverse chronological order.
   * @param { ListGroupsRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<CreateGroupResponse>}
   */
  public list(data: ListGroupsRequestData): ApiListPromise<GroupResponse> {
    this.client = this.getSinchClient();
    data['page'] = data['page'] !== undefined ? data['page'] : 0;
    data['page_size'] = data['page_size'] !== undefined ? data['page_size'] : 30;
    const getParams = this.client.extractQueryParams<ListGroupsRequestData>(data, ['page', 'page_size']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups`;

    const requestOptionsPromise = this.client.prepareOptions(
      basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE,
      apiName: this.apiName,
      operationId: 'ListGroups',
      dataKey: 'groups',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<GroupResponse>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<GroupResponse>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<GroupResponse>;
  }

  /**
   * Replace a group
   * The replace operation will replace all parameters, including members, of an existing group with new values.  Replacing a group targeted by a batch message scheduled in the future is allowed and changes will be reflected when the batch is sent.
   * @param { ReplaceGroupRequestData } data - The data to provide to the API call.
   */
  public async replace(data: ReplaceGroupRequestData): Promise<ReplaceGroupResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ReplaceGroupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['replaceGroupRequestBody'] ? JSON.stringify(data['replaceGroupRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups/${data['group_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ReplaceGroupResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReplaceGroup',
    });
  }

  /**
   * Retrieve a group
   * This operation retrieves a specific group with the provided group ID.
   * @param { GetGroupRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetGroupRequestData): Promise<GroupResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetGroupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups/${data['group_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<GroupResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RetrieveGroup',
    });
  }

  /**
   * Update a group
   * With the update group operation, you can add and remove members in an existing group as well as rename the group.  This method encompasses a few ways to update a group:  1. By using &#x60;add&#x60; and &#x60;remove&#x60; arrays containing phone numbers, you control the group movements. Any list of valid numbers in E.164 format can be added. 2. By using the &#x60;auto_update&#x60; object, your customer can add or remove themselves from groups.  3. You can also add or remove other groups into this group with &#x60;add_from_group&#x60; and &#x60;remove_from_group&#x60;.  #### Other group update info  - The request will not be rejected for duplicate adds or unknown removes. - The additions will be done before the deletions. If an phone number is on both lists, it will not be apart of the resulting group. - Updating a group targeted by a batch message scheduled in the future is allowed. Changes will be reflected when the batch is sent.
   * @param { UpdateGroupRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateGroupRequestData): Promise<UpdateGroupResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateGroupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateGroupRequestBody'] ? JSON.stringify(data['updateGroupRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/xms/v1/${this.client.apiClientOptions.projectId}/groups/${data['group_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<UpdateGroupResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateGroup',
    });
  }

}
