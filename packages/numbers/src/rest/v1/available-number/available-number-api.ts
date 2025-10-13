import {
  ActiveNumber,
  AvailableNumber,
  AvailableNumbersResponse,
  GetAvailableNumberRequestData,
  ListAvailableNumbersRequestData,
  RentAnyNumberRequestData,
  RentNumberRequestData,
} from '../../../models';
import {
  RequestBody,
} from '@sinch/sdk-client';
import { NumbersDomainApi } from '../numbers-domain-api';
import { LazyNumbersApiClient } from '../numbers-service';

export class AvailableNumberApi extends NumbersDomainApi {

  constructor(lazyClient: LazyNumbersApiClient) {
    super(lazyClient, 'AvailableNumbersApi');
  }

  /**
   * Get available number
   * This endpoint allows you to enter a specific phone number to check if it\&#39;s available for use. A 200 response will return the number\&#39;s capability, setup costs, monthly costs and if supporting documentation is required.
   * @param {GetAvailableNumberRequestData} data - The data to provide to the API call.
   */
  public async checkAvailability(data: GetAvailableNumberRequestData): Promise<AvailableNumber> {
    const client = this.client;
    const getParams
      = client.extractQueryParams<GetAvailableNumberRequestData>(
        data,
        [] as never[],
      );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${client.apiClientOptions.hostname}/v1/projects/${client.apiClientOptions.projectId}/availableNumbers/${data['phoneNumber']}`;

    const requestOptions = await client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return client.processCall<AvailableNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetAvailableNumber',
    });
  }

  /**
   * List available numbers
   * Search for virtual numbers that are available for you to activate. You can filter by any property on the available number resource.
   * @param {ListAvailableNumbersRequestData} data - The data to provide to the API call.
   */
  public async list(data: ListAvailableNumbersRequestData): Promise<AvailableNumbersResponse> {
    const client = this.client;
    const getParams
      = client.extractQueryParams<ListAvailableNumbersRequestData>(data, [
        'numberPattern.pattern',
        'numberPattern.searchPattern',
        'regionCode',
        'type',
        'capabilities',
        'size',
      ]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${client.apiClientOptions.hostname}/v1/projects/${client.apiClientOptions.projectId}/availableNumbers`;

    const requestOptions = await client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = client.prepareUrl(requestOptions.hostname, requestOptions.queryParams, true);

    return client.processCall<AvailableNumbersResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListAvailableNumbers',
    });
  }

  /**
   * Rent any number that matches the criteria
   * Search for and activate an available Sinch virtual number all in one API call. Currently, the rentAny operation works only for US 10DLC numbers
   * @param {RentAnyNumberRequestData} data - The data to provide to the API call.
   */
  public async rentAny(data: RentAnyNumberRequestData): Promise<ActiveNumber> {
    const client = this.client;
    const getParams = client.extractQueryParams<RentAnyNumberRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['rentAnyNumberRequestBody']
      ? JSON.stringify(data['rentAnyNumberRequestBody'])
      : '{}';
    const basePathUrl = `${client.apiClientOptions.hostname}/v1/projects/${client.apiClientOptions.projectId}/availableNumbers:rentAny`;

    const requestOptions = await client.prepareOptions(
      basePathUrl,
      'POST',
      getParams,
      headers,
      body || undefined,
    );
    const url = client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RentAnyNumber',
    });
  }

  /**
   * Rent an available number
   * Activate a virtual number to use with SMS products, Voice products, or both. You'll use 'smsConfiguration' to set up your number for SMS and 'voiceConfiguration' for Voice.
   * @param {RentNumberRequestData} data - The data to provide to the API call.
   */
  public async rent(data: RentNumberRequestData): Promise<ActiveNumber> {
    const client = this.client;
    const getParams = client.extractQueryParams<RentNumberRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['rentNumberRequestBody']
      ? JSON.stringify(data['rentNumberRequestBody'])
      : '{}';
    const basePathUrl = `${client.apiClientOptions.hostname}/v1/projects/${client.apiClientOptions.projectId}/availableNumbers/${data['phoneNumber']}:rent`;

    const requestOptions = await client.prepareOptions(
      basePathUrl,
      'POST',
      getParams,
      headers,
      body || undefined,
    );
    const url = client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'RentNumber',
    });
  }
}
