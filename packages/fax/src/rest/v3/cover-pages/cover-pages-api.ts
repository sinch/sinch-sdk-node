import {
  CoverPage,
  AddCoverPageRequestData,
  DeleteCoverPageRequestData,
  GetCoverPageRequestData,
  ListCoverPagesRequestData,
} from '../../../models';
import {
  ApiListPromise, buildPageResultPromise, createIteratorMethodsForPagination, PaginatedApiProperties, PaginationEnum,
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { FaxDomainApi } from '../fax-domain-api';

export class CoverPagesApi extends FaxDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CoverPagesApi');
  }

  /**
   * Add cover page
   * Add a cover page to your service
   * @param { AddCoverPageRequestData } data - The data to provide to the API call.
   */
  public async add(data: AddCoverPageRequestData): Promise<CoverPage> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<AddCoverPageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['addCoverPageRequestBody'] ? JSON.stringify(data['addCoverPageRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/coverPages`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CoverPage>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'AddCoverPage',
    });
  }

  /**
   * Delete a cover page
   * Remove delete a cover page from a service.
   * @param { DeleteCoverPageRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteCoverPageRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteCoverPageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/coverPages/${data['coverPageId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteCoverPage',
    });
  }

  /**
   * Get a cover page
   * Get a cover page by ID.
   * @param { GetCoverPageRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetCoverPageRequestData): Promise<CoverPage> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetCoverPageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/coverPages/${data['coverPageId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CoverPage>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCoverPage',
    });
  }

  /**
   * List cover pages
   * List all cover page to a service
   * @param { ListCoverPagesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<CoverPage>}
   */
  public list(data: ListCoverPagesRequestData): ApiListPromise<CoverPage> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListCoverPagesRequestData>(data, ['pageSize', 'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/services/${data['serviceId']}/coverPages`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'ListCoverPages',
      dataKey: 'coverPages',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<CoverPage>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<CoverPage>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<CoverPage>;
  }


}
