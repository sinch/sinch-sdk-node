import { randomUUID } from 'crypto';
import {
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import {
  CreateServiceRequestData,
  DeleteServiceRequestData,
  GetServiceRequestData,
  ListServicesRequestData,
  ServiceResponse,
  ServiceShortResponse,
  UpdateServiceRequestData,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class ServicesApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'ServicesApi');
  }

  /**
   * List all services of a project
   * Retrieve a list of voice services in the specified project.
   *
   * Optionally:
   * - Filter services by partial match on name or description (`filter`)
   * - Return only the default service (`isDefault=true`)
   * @param { ListServicesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ServiceShortResponse>}
   */
  public list(data?: ListServicesRequestData): ApiListPromise<ServiceShortResponse> {
    const getParams = this.client.extractQueryParams<ListServicesRequestData>(
      data ?? {},
      [
        'filter',
        'isDefault',
        'pageSize',
        'page',
      ],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/services`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE_LINK,
      apiName: this.apiName,
      operationId: 'listServices',
      dataKey: 'services',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<ServiceShortResponse>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<ServiceShortResponse>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ServiceShortResponse>;
  }

  /**
   * Create a new voice service
   * Creates a new voice service in the specified project.
   * @param { CreateServiceRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateServiceRequestData): Promise<ServiceResponse> {
    const getParams = this.client.extractQueryParams<CreateServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'] ?? randomUUID(),
    };

    const body: RequestBody = data['createServiceRequestBody']
      ? JSON.stringify(data['createServiceRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/services`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'createService',
    });
  }

  /**
   * Retrieve a voice service by ID
   * Retrieve the full details of a specific voice service by its `serviceId`.
   * @param { GetServiceRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetServiceRequestData): Promise<ServiceResponse> {
    const getParams = this.client.extractQueryParams<GetServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getService',
    });
  }

  /**
   * Update a voice service
   * Updates an existing service resource with the provided properties. Only the fields included in
   * the request body will be modified; omitted fields remain unchanged.
   *
   * To set a service as the default for the project, include `"isDefault": true` in the request.
   * Each project can have only one default service. `"isDefault": false` is invalid and will not
   * be accepted by the API.
   * @param { UpdateServiceRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateServiceRequestData): Promise<ServiceResponse> {
    const getParams = this.client.extractQueryParams<UpdateServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'] ?? randomUUID(),
    };

    const body: RequestBody = data['updateServiceRequestBody']
      ? JSON.stringify(data['updateServiceRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ServiceResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'updateService',
    });
  }

  /**
   * Delete a voice service by ID
   * Deletes a service permanently.
   *
   * The default service cannot be deleted. To delete the current default service, a different
   * service must first be designated as the default using the update endpoint.
   * @param { DeleteServiceRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteServiceRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteServiceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'deleteService',
    });
  }

}
