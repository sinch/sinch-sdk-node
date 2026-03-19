import {
  RequestBody,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
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
  AddCredentialListIdsToTrunkRequestData,
  CredentialList,
  CredentialListIds,
  UpdateCredentialListIdsForTrunkRequestData,
  ListCredentialListsForTrunkRequestData,
  DeleteCredentialListFromTrunkRequestData,
} from '../../../models';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';

export class SipTrunksApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'SipTrunksApi');
  }

  /**
   * Add ACL to a trunk
   * Add an access control list entry to a trunk.
   * @param { AddAccessControlListToTrunkRequestData } data - The data to provide to the API call.
   */
  public async addAccessControlList(
    data: AddAccessControlListToTrunkRequestData,
  ): Promise<AddAccessControlListToTrunk> {
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
   * Add credential lists to SIP trunk
   * Add credential lists to a specified SIP trunk.
   * @param { AddCredentialListIdsToTrunkRequestData } data - The data to provide to the API call.
   */
  public async addCredentialLists(data: AddCredentialListIdsToTrunkRequestData): Promise<CredentialListIds> {
    const getParams = this.client.extractQueryParams<AddCredentialListIdsToTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['addCredentialListIdsToTrunkRequestBody']
      ? JSON.stringify(data['addCredentialListIdsToTrunkRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/credentialLists`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CredentialListIds>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'AddCredentialListToTrunk',
    });
  }

  /**
   * Create SIP trunk
   * Creates a new SIP trunk.
   * @param { CreateSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateSipTrunkRequestData): Promise<SipTrunk> {
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
   * Remove credential list from sip trunk
   *
   * @param { DeleteCredentialListFromTrunkRequestData } data - The data to provide to the API call.
   */
  public async deleteCredentialList(data: DeleteCredentialListFromTrunkRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteCredentialListFromTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/credentialLists/${data['credentialListId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RemoveCredentialListFromTrunk',
    });
  }

  /**
   * List all ACLs for a trunk
   * Get all access control list entries for a trunk.
   * @param { ListAccessControlListsForTrunkRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<string> }
   */
  public listAccessControlLists(data: ListAccessControlListsForTrunkRequestData): ApiListPromise<string> {
    const getParams = this.client.extractQueryParams<ListAccessControlListsForTrunkRequestData>(data, ['page', 'size']);
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
    const getParams = this.client.extractQueryParams<ListSipTrunksRequestData>(data, ['page', 'size', 'domain']);
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
   * Get credential lists for SIP trunk
   * Return all the credential lists for a specified SIP trunk.
   * @param { ListCredentialListsForTrunkRequestData } data - The data to provide to the API call.
   */
  public listCredentialLists(data: ListCredentialListsForTrunkRequestData): ApiListPromise<CredentialList> {
    const getParams = this.client.extractQueryParams<ListCredentialListsForTrunkRequestData>(data,
      ['page', 'size', 'sort']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/credentialLists`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetCredentialListsForTrunk',
      dataKey: 'credentialLists',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<CredentialList>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<CredentialList>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<CredentialList>;
  }

  /**
   * Update SIP trunk
   * Update an existing SIP Trunk by ID. The whole object must be sent. Any missing fields will be set to null.
   * @param { UpdateSipTrunkRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateSipTrunkRequestData): Promise<SipTrunk> {
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

  /**
   * Bulk update credential lists for a trunk
   * Update the list of credential list entries for a trunk.
   * @param { UpdateCredentialListIdsForTrunkRequestData } data - The data to provide to the API call.
   */
  public async updateCredentialLists(
    data: UpdateCredentialListIdsForTrunkRequestData,
  ): Promise<CredentialListIds> {
    const getParams = this.client.extractQueryParams<UpdateCredentialListIdsForTrunkRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCredentialListIdsForTrunkRequestBody']
      ? JSON.stringify(data['updateCredentialListIdsForTrunkRequestBody']) : '[]';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['trunkId']}/credentialLists`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CredentialListIds>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'BulkUpdateCredentialListsForTrunk',
    });
  }

}
