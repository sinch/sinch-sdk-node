import {
  Credential,
  CredentialList,
  DeleteCredentialListRequestData,
  UpdateCredentialRequestData,
  UpdateCredentialListRequestData,
  GetCredentialListRequestData,
  ListTrunksForCredentialListRequestData,
  SipTrunk,
  DeleteCredentialRequestData,
  CreateCredentialListRequestData,
  ListCredentialListsRequestData,
} from '../../../models';
import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
} from '@sinch/sdk-client';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';

export class CredentialListsApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'CredentialListsApi');
  }

  /**
   * Create credential list
   * Create a credential list for the specified project.
   * @param { CreateCredentialListRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateCredentialListRequestData): Promise<CredentialList> {
    const getParams = this.client.extractQueryParams<CreateCredentialListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createCredentialListRequestBody']
      ? JSON.stringify(data['createCredentialListRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CredentialList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateCredentialList',
    });
  }

  /**
   * Delete a credential list
   *
   * @param { DeleteCredentialListRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteCredentialListRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteCredentialListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteCredentialList',
    });
  }


  /**
   * Get credential list
   * Return a credential list by its specified ID.
   * @param { GetCredentialListRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetCredentialListRequestData): Promise<CredentialList> {
    const getParams = this.client.extractQueryParams<GetCredentialListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CredentialList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCredentialListById',
    });
  }

  /**
   * Get credential lists
   * Return all the credential lists for the specified project.
   * @param { ListCredentialListsRequestData } data - The data to provide to the API call.
   */
  public list(data: ListCredentialListsRequestData): ApiListPromise<CredentialList> {
    const getParams = this.client.extractQueryParams<ListCredentialListsRequestData>(data, ['page', 'size']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetCredentialLists',
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
   * Get trunks for credential list
   * Returns a list of all the trunks which use the specified credential list.
   * @param { ListTrunksForCredentialListRequestData } data - The data to provide to the API call.
   */
  public listTrunks(data: ListTrunksForCredentialListRequestData): ApiListPromise<SipTrunk> {
    const getParams = this.client.extractQueryParams<ListTrunksForCredentialListRequestData>(data, ['page', 'size']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}/trunks`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'TrunksByCredentialList',
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
   * Update the password for a credential
   *
   * @param { UpdateCredentialRequestData } data - The data to provide to the API call.
   */
  public async updateCredential(data: UpdateCredentialRequestData): Promise<Credential> {
    const getParams = this.client.extractQueryParams<UpdateCredentialRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCredentialPasswordRequestBody']
      ? JSON.stringify(data['updateCredentialPasswordRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}/credentials/${data['username']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Credential>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCredential',
    });
  }

  /**
   * Delete a credential
   *
   * @param { DeleteCredentialRequestData } data - The data to provide to the API call.
   */
  public async deleteCredential(data: DeleteCredentialRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteCredentialRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}/credentials/${data['username']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteCredential',
    });
  }


  /**
   * Update a credential list
   *
   * @param { UpdateCredentialListRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateCredentialListRequestData): Promise<CredentialList> {
    const getParams = this.client.extractQueryParams<UpdateCredentialListRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCredentialListRequestBody']
      ? JSON.stringify(data['updateCredentialListRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/credentialLists/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CredentialList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCredentialList',
    });
  }

}
