import {
  CreateServiceRequestData,
  DeleteServiceRequestData,
  GetServiceRequestData,
  ListEmailsForNumberRequestData,
  ListNumbersForServiceRequestData,
  ListServicesRequestData,
  ServicePhoneNumber,
  ServiceResponse,
  UpdateServiceRequestData,
} from '../../../models';
import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { FaxDomainApi } from '../fax-domain-api';

export class ServicesApi extends FaxDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'ServicesApi');
  }

  /**
   * Create a service
   * Creates a new service that you can use to set default configuration values.
   * @param { CreateServiceRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateServiceRequestData): Promise<ServiceResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createServiceRequestBody']
      ? JSON.stringify(data['createServiceRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateService',
    });
  }

  /**
   * Get a service
   * Get a service resource.
   * @param { GetServiceRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetServiceRequestData): Promise<ServiceResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetService',
    });
  }

  /**
   * List emails for a number
   * List any emails for a number.
   * @param { ListEmailsForNumberRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<string>} - The list of emails for a given number
   */
  public listEmailsForNumber(data: ListEmailsForNumberRequestData): ApiListPromise<string> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListEmailsForNumberRequestData>(data, ['pageSize', 'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/numbers/${data['phoneNumber']}/emails`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'GetEmailsForNumber',
      dataKey: 'emails',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<string>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<string>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<string>;
  }

  /**
   * List numbers for service
   * List numbers for a service.
   * @param { ListNumbersForServiceRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ServicePhoneNumber>}
   */
  public listNumbers(data: ListNumbersForServiceRequestData): ApiListPromise<ServicePhoneNumber> {
    this.client = this.getSinchClient();
    data['pageSize'] = data['pageSize'] !== undefined ? data['pageSize'] : 20;
    const getParams = this.client.extractQueryParams<ListNumbersForServiceRequestData>(data, ['pageSize', 'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/numbers`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'ListNumbersForService',
      dataKey: 'numbers',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<ServicePhoneNumber>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<ServicePhoneNumber>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ServicePhoneNumber>;
  }

  /**
   * List services
   * Get a list of services for a project.
   * @param { ListServicesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ServiceResponse>}
   */
  public list(data: ListServicesRequestData): ApiListPromise<ServiceResponse> {
    this.client = this.getSinchClient();
    data['pageSize'] = data['pageSize'] !== undefined ? data['pageSize'] : 20;
    const getParams = this.client.extractQueryParams<ListServicesRequestData>(data, ['pageSize', 'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'ListServices',
      dataKey: 'services',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<ServiceResponse>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<ServiceResponse>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ServiceResponse>;
  }

  /**
   * Remove a service
   * Removes a service from your project.
   * @param { DeleteServiceRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteServiceRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RemoveService',
    });
  }

  /**
   * Update a Service
   * Update settings on the service.
   * @param { UpdateServiceRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateServiceRequestData): Promise<ServiceResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateServiceRequestBody']
      ? JSON.stringify(data['updateServiceRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateService',
    });
  }

}
