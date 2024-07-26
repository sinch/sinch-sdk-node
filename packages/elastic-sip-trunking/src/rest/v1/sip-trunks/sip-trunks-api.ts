import {
  AddAccessControlListToTrunk,
  AddAccessControlListToTrunkRequestData,
  CreateSipTrunkRequestData,
  DeleteAccessControlListFromTrunkRequestData,
  DeleteSipTrunkRequestData,
  ListAccessControlListsForTrunkRequestData,
  GetSipTrunkRequestData,
  ListSipTrunksRequestData,
  UpdateSipTrunkRequestData,
  SipTrunk,
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

export class SipTrunksApi extends ElasticSipTrunkingDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'SipTrunksApi');
  }

  /**
   * Add ACL to a trunk
   * Add an access control list entry to a trunk.
   * @param { AddAccessControlListToTrunkRequestData } data - The data to provide to the API call.
   */
  public async addAccessControlList(
    data: AddAccessControlListToTrunkRequestData,
  ): Promise<AddAccessControlListToTrunk> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<AddAccessControlListToTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['addAccessControlListToTrunkRequestBody']
      ? JSON.stringify(data['addAccessControlListToTrunkRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/accessControlLists`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AddAccessControlListToTrunk>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'AddAccessControlListToTrunk',
    });
  }

  /**
   * Create SIP trunk
   * Creates a new SIP trunk.
   * @param { CreateSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateSipTrunkRequestData): Promise<SipTrunk> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateSipTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createSipTrunkRequestBody']
      ? JSON.stringify(data['createSipTrunkRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipTrunk>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateSipTrunk',
    });
  }

  /**
   * Delete ACL from trunk
   * Remove an access control list entry from a trunk.
   * @param { DeleteAccessControlListFromTrunkRequestData } data - The data to provide to the API call.
   */
  public async deleteAccessControlList(data: DeleteAccessControlListFromTrunkRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteAccessControlListFromTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/accessControlLists/${data['accessControlListId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteAccessControlListFromTrunk',
    });
  }

  /**
   * Delete SIP trunk
   * Delete a SIP trunk by its ID.
   * @param { DeleteSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteSipTrunkRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteSipTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteSipTrunk',
    });
  }

  /**
   * List all ACLs for a trunk
   * Get all access control list entries for a trunk.
   * @param { ListAccessControlListsForTrunkRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<string> }
   */
  public listAccessControlLists(data: ListAccessControlListsForTrunkRequestData): ApiListPromise<string> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListAccessControlListsForTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/accessControlLists`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetAccessControlListsForTrunk',
      dataKey: 'accessControlListIds',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<string>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<string>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<string>;
  }

  /**
   * Get SIP Trunk
   * Search for a SIP trunk by ID.
   * @param { GetSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetSipTrunkRequestData): Promise<SipTrunk> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetSipTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipTrunk>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetSipTrunkById',
    });
  }

  /**
   * List SIP trunks
   * Returns a list of all SIP trunks. If you specify pagination settings, the list of SIP trunks can be returned separated and sorted into pages.
   * @param { ListSipTrunksRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<SipTrunk> }
   */
  public list(data: ListSipTrunksRequestData): ApiListPromise<SipTrunk> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListSipTrunksRequestData>(data, ['page', 'pageSize', 'domain']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetSipTrunks',
      dataKey: 'trunks',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<SipTrunk>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<SipTrunk>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<SipTrunk>;
  }

  /**
   * Update SIP trunk
   * Update an existing SIP Trunk by ID. The whole object must be sent. Any missing fields will be set to null.
   * @param { UpdateSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateSipTrunkRequestData): Promise<SipTrunk> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateSipTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateSipTrunkRequestBody']
      ? JSON.stringify(data['updateSipTrunkRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipTrunk>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateSipTrunk',
    });
  }

}
