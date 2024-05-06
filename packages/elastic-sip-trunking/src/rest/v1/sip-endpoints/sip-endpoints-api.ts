import {
  CreateSipEndpointRequestData,
  DeleteSipEndpointRequestData,
  ListSipEndpointsRequestData,
  GetSipEndpointByIdRequestData,
  UpdateSipEndpointRequestData,
  SipEndpoint,
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

export class SipEndpointsApi extends ElasticSipTrunkingDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'SipEndpointsApi');
  }

  /**
   * Create SIP endpoint
   * Create a new SIP endpoint.
   * @param { CreateSipEndpointRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateSipEndpointRequestData): Promise<SipEndpoint> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateSipEndpointRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createSipEndpointRequestBody']
      ? JSON.stringify(data['createSipEndpointRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}/endpoints`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipEndpoint>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateSipEndpoint',
    });
  }


  /**
   * Delete SIP endpoint
   * Delete a SIP endpoint by specifying its ID.
   * @param { DeleteSipEndpointRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteSipEndpointRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteSipEndpointRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}/endpoints/${data['sipEndpointId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteSipEndpoint',
    });
  }


  /**
   * Return SIP endpoints
   * Returns a list of all SIP endpoints with paging.
   * @param { ListSipEndpointsRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<SipEndpoint> }
   */
  public list(data: ListSipEndpointsRequestData): ApiListPromise<SipEndpoint> {
    this.client = this.getSinchClient();
    data['page'] = data['page'] !== undefined ? data['page'] : 1;
    data['pageSize'] = data['pageSize'] !== undefined ? data['pageSize'] : 1000;
    const getParams = this.client.extractQueryParams<ListSipEndpointsRequestData>(data, ['page', 'pageSize']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}/endpoints`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetSipEndpoint',
      dataKey: 'endpoints',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<SipEndpoint>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<SipEndpoint>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<SipEndpoint>;
  }


  /**
   * Get SIP endpoint by ID
   * Get a SIP endpoint by specifying its ID.
   * @param { GetSipEndpointByIdRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetSipEndpointByIdRequestData): Promise<SipEndpoint> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetSipEndpointByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}/endpoints/${data['sipEndpointId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipEndpoint>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetSipEndpointById',
    });
  }


  /**
   * Update existing SIP endpoint
   * Updated an existing SIP endpoint by specifying its ID.
   * @param { UpdateSipEndpointRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateSipEndpointRequestData): Promise<SipEndpoint> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateSipEndpointRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateSipEndpointRequestBody']
      ? JSON.stringify(data['updateSipEndpointRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/trunks/${data['sipTrunkId']}/endpoints/${data['sipEndpointId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SipEndpoint>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateSipEndpoint',
    });
  }

}
