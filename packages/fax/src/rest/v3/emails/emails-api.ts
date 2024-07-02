import {
  AddEmailToNumbersRequestData,
  DeleteEmailRequestData,
  Email,
  ListEmailsForNumberRequestData,
  ListEmailsForProjectRequestData,
  ListNumbersByEmailRequestData,
  ServicePhoneNumber,
  UpdateEmailRequestData,
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
import { ServicesApi } from '../services';

export class EmailsApi extends FaxDomainApi {

  private servicesApi: ServicesApi;

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'EmailsApi');
    this.servicesApi = new ServicesApi(sinchClientParameters);
  }

  /**
   * Add an email
   * Add an email to be used for sending and receiving faxes.
   * @param { AddEmailToNumbersRequestData } data - The data to provide to the API call.
   */
  public async addToNumbers(data: AddEmailToNumbersRequestData): Promise<Email> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<AddEmailToNumbersRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['emailRequestBody'] ? JSON.stringify(data['emailRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/emails`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Email>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateEmailForProject',
    });
  }

  /**
   * Remove email
   * Delete an email and associated numbers to that email to disable that email from sending and receiving faxes.
   * @param { DeleteEmailRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteEmailRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteEmailRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['email'] ? JSON.stringify(data['email']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/emails/${data['email']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteEmail',
    });
  }

  /**
   * List emails
   * List emails for the project.
   * @param { ListEmailsForProjectRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<Email>} - The list of emails for the project
   */
  public list(data: ListEmailsForProjectRequestData): ApiListPromise<Email> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListEmailsForProjectRequestData>(data, ['pageSize', 'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/emails`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'GetEmailsForProject',
      dataKey: 'emails',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Email>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Email>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<Email>;
  }

  /**
   * List emails for a number
   * List any emails for a number.
   * @param { ListEmailsForNumberRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<string>} - The list of emails for a given number
   */
  public listForNumber(data: ListEmailsForNumberRequestData): ApiListPromise<string> {
    return this.servicesApi.listEmailsForNumber(data);
  }

  /**
   * Get numbers for email
   * Get configured numbers for an email
   * @param { ListNumbersByEmailRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ServicePhoneNumber>}
   */
  public listNumbers(data: ListNumbersByEmailRequestData): ApiListPromise<ServicePhoneNumber> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListNumbersByEmailRequestData>(data, [
      'pageSize',
      'page']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/emails/${data['email']}/numbers`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE3,
      apiName: this.apiName,
      operationId: 'GetNumbersByEmail',
      dataKey: 'phoneNumbers',
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
   * Update numbers for email
   * Set the numbers for an email.
   * @param { UpdateEmailRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateEmailRequestData): Promise<Email> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateEmailRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateEmailRequestBody']
      ? JSON.stringify(data['updateEmailRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/projects/${this.client.apiClientOptions.projectId}/emails/${data['email']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Email>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateEmail',
    });
  }

}
