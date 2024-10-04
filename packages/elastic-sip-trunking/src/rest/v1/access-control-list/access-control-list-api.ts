import {
  AccessControlList,
  AddAccessControlListToTrunkRequestData,
  AddIpRangeToAccessControlListRequestData,
  CreateAccessControlListRequestData,
  DeleteAccessControlListRequestData,
  DeleteAccessControlListFromTrunkRequestData,
  DeleteIpRangeFromAccessControlListRequestData,
  ListAccessControlListRequestData,
  ListIpRangesForAccessControlListRequestData,
  UpdateAccessControlListRequestData,
  UpdateIpRangeFromAccessControlListRequestData,
  ListAccessControlListsForTrunkRequestData,
  AddAccessControlListToTrunk,
  IpRange,
  GetAccessControlListRequestData,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { SipTrunksApi } from '../sip-trunks';

export class AccessControlListApi extends ElasticSipTrunkingDomainApi {

  private sipTrunksApi: SipTrunksApi;

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'AccessControlListApi');
    this.sipTrunksApi = new SipTrunksApi(sinchClientParameters);
  }

  /**
   * Add ACL to a trunk
   * Add an access control list entry to a trunk.
   * @param { AddAccessControlListToTrunkRequestData } data - The data to provide to the API call.
   */
  public async addToTrunk(data: AddAccessControlListToTrunkRequestData): Promise<AddAccessControlListToTrunk> {
    return this.sipTrunksApi.addAccessControlList(data);
  }

  /**
   * List all ACLs for a trunk
   * Get all access control list entries for a trunk.
   * @param { ListAccessControlListsForTrunkRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<string> }
   */
  public listForTrunk(data: ListAccessControlListsForTrunkRequestData): ApiListPromise<string> {
    return this.sipTrunksApi.listAccessControlLists(data);
  }

  /**
   * Delete ACL from trunk
   * Remove an access control list entry from a trunk.
   * @param { DeleteAccessControlListFromTrunkRequestData } data - The data to provide to the API call.
   */
  public async deleteFromTrunk(data: DeleteAccessControlListFromTrunkRequestData): Promise<void> {
    return this.sipTrunksApi.deleteAccessControlList(data);
  }

  /**
   * Add IP range to ACL
   * Add an IP range to an access control list entry.
   * @param { AddIpRangeToAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async addIpRange(data: AddIpRangeToAccessControlListRequestData): Promise<IpRange> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<AddIpRangeToAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['addIpRangeRequestBody'] ? JSON.stringify(data['addIpRangeRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['accessControlListId']}/ipRanges`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<IpRange>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'AddIpRangeToAccessControlList',
    });
  }

  /**
   * Create an ACL
   * Create an access control list entry with at least one IP address or IP range.
   * @param { CreateAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateAccessControlListRequestData): Promise<AccessControlList> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createAccessControlListBody']
      ? JSON.stringify(data['createAccessControlListBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AccessControlList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateAccessControlList',
    });
  }

  /**
   * Delete ACL
   * Delete an access control list entry.
   * @param { DeleteAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteAccessControlListRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteAccessControlList',
    });
  }

  /**
   * Delete IP range from ACL
   * Remove an IP range to an access control list entry.
   * @param { DeleteIpRangeFromAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async deleteIpRange(data: DeleteIpRangeFromAccessControlListRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteIpRangeFromAccessControlListRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['accessControlListId']}/ipRanges/${data['ipRangeId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteIpRangeFromAccessControlList',
    });
  }

  /**
   * Get Access Control List
   * Search for an Access Control List by ID.
   * @param { GetAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetAccessControlListRequestData): Promise<AccessControlList> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AccessControlList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetAccessControlListById',
    });
  }

  /**
   * List ACLs
   * Fetches the list of Access Control List entries.
   * @param { ListAccessControlListRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<AccessControlList> }
   */
  public list(data: ListAccessControlListRequestData): ApiListPromise<AccessControlList> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetAccessControlLists',
      dataKey: 'accessControlLists',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<AccessControlList>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<AccessControlList>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<AccessControlList>;
  }

  /**
   * List all IP ranges for ACL
   * Get all IP ranges for an access control list entry.
   * @param { ListIpRangesForAccessControlListRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<IpRange> }
   */
  public listIpRanges(data: ListIpRangesForAccessControlListRequestData): ApiListPromise<IpRange> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListIpRangesForAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['accessControlListId']}/ipRanges`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetIpRangesForAccessControlList',
      dataKey: 'ipRanges',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<IpRange>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<IpRange>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<IpRange>;
  }

  /**
   * Update ACL
   * Create an access control list entry with at least one IP address or IP range.
   * @param { UpdateAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateAccessControlListRequestData): Promise<AccessControlList> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateAccessControlListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateAccessControlListRequestBody']
      ? JSON.stringify(data['updateAccessControlListRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AccessControlList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateAccessControlList',
    });
  }

  /**
   * Update IP range
   * Update an IP range to an access control list entry.
   * @param { UpdateIpRangeFromAccessControlListRequestData } data - The data to provide to the API call.
   */
  public async updateIpRange(
    data: UpdateIpRangeFromAccessControlListRequestData,
  ): Promise<IpRange> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateIpRangeFromAccessControlListRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateIpRangeRequestBody']
      ? JSON.stringify(data['updateIpRangeRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/accessControlLists/${data['accessControlListId']}/ipRanges/${data['ipRangeId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<IpRange>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateIpRangeFromAccessControlList',
    });
  }

}
