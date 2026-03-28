import {
  ActiveNumber,
  DeprovisionEmergencyAddressRequestData,
  EmergencyAddress,
  GetActiveNumberRequestData,
  GetEmergencyAddressRequestData,
  ListActiveNumbersRequestData,
  ProvisionEmergencyAddressRequestData,
  ReleaseNumberRequestData,
  UpdateActiveNumberRequestData,
  ValidateEmergencyAddressResponse,
  ValidateEmergencyAddressRequestData,
} from '../../../models';
import {
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { NumbersDomainApi } from '../numbers-domain-api';
import { LazyNumbersApiClient } from '../numbers-service';

export class ActiveNumberApi extends NumbersDomainApi {

  constructor(lazyClient: LazyNumbersApiClient) {
    super(lazyClient, 'ActiveNumberApi');
  }

  /**
   * Get active Number
   * Get a virtual number
  * @param {GetActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async get(data: GetActiveNumberRequestData): Promise<ActiveNumber> {
    const getParams
      = this.client.extractQueryParams<GetActiveNumberRequestData>(
        data,
        [] as never[],
      );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetActiveNumber',
    });
  }

  /**
   * List active numbers
   * Lists all virtual numbers for a project.
   * @param {ListActiveNumbersRequestData} data - The data to provide to the API call.
   * @return {ApiListPromise<ActiveNumber>}
   */
  public list(data?: ListActiveNumbersRequestData): ApiListPromise<ActiveNumber> {
    const getParams = this.client.extractQueryParams<ListActiveNumbersRequestData>(data ?? {}, [
      'regionCode',
      'numberPattern.pattern',
      'numberPattern.searchPattern',
      'type',
      'capability',
      'pageSize',
      'pageToken',
      'orderBy',
    ]);

    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.TOKEN,
      apiName: this.apiName,
      operationId: 'ListActiveNumbers',
      dataKey: 'activeNumbers',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<ActiveNumber>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<ActiveNumber>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ActiveNumber>;
  }

  /**
   * Release number
   * With this endpoint, you can cancel your subscription for a specific virtual phone number.
   * @param {ReleaseNumberRequestData} data - The data to provide to the API call.
   */
  public async release(data: ReleaseNumberRequestData): Promise<ActiveNumber> {
    const getParams = this.client.extractQueryParams<ReleaseNumberRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}:release`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'POST',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReleaseNumber',
    });
  }

  /**
   * Update active number
   * Update a virtual phone number. For example: you can configure SMS/Voice services or set a friendly name. To update the name that displays, modify the `displayName` parameter.
   * You'll use `smsConfiguration` to update your SMS configuration and `voiceConfiguration` to update the voice configuration.
   * @param {UpdateActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async update(data: UpdateActiveNumberRequestData): Promise<ActiveNumber> {
    const getParams = this.client.extractQueryParams<UpdateActiveNumberRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateActiveNumberRequestBody']
      ? JSON.stringify(data['updateActiveNumberRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'PATCH',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateActiveNumber',
    });
  }

  /**
   * Remove the emergency address for a number.
   * With this endpoint, you can deprovision the emergency address associated with this number.
   * @param {DeprovisionEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async deprovisionEmergencyAddress(data: DeprovisionEmergencyAddressRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeprovisionEmergencyAddressRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}/emergencyAddress:deprovision`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeprovisionEmergencyAddress',
    });
  }

  /**
   * Get the emergency address for a number
   * With this endpoint, you can retrieve the emergency address associated with this number.
   * @param {GetEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async getEmergencyAddress(data: GetEmergencyAddressRequestData): Promise<EmergencyAddress> {
    const getParams = this.client.extractQueryParams<GetEmergencyAddressRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}/emergencyAddress`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<EmergencyAddress>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetEmergencyAddress',
    });
  }

  /**
   * Add a emergency address for a number
   * With this endpoint, you can provision an emergency address associated with this number.
   * @param {ProvisionEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async provisionEmergencyAddress(data: ProvisionEmergencyAddressRequestData): Promise<EmergencyAddress> {
    const getParams = this.client.extractQueryParams<ProvisionEmergencyAddressRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['emergencyAddressRequestBody']
      ? JSON.stringify(data['emergencyAddressRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}/emergencyAddress:provision`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<EmergencyAddress>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ProvisionEmergencyAddress',
    });
  }

  /**
   * Validate the emergency address for a number.
   * With this endpoint, you can validate the emergency address associated with this number.
   * @param {ValidateEmergencyAddressRequestData} data - The data to provide to the API call.
   */
  public async validateEmergencyAddress(
    data: ValidateEmergencyAddressRequestData,
  ): Promise<ValidateEmergencyAddressResponse> {
    const getParams = this.client.extractQueryParams<ValidateEmergencyAddressRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['emergencyAddressRequestBody']
      ? JSON.stringify(data['emergencyAddressRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}/emergencyAddress:validate`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ValidateEmergencyAddressResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ValidateEmergencyAddress',
    });
  }
}
