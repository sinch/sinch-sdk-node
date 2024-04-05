import {
  GetCallbacks,
  ListNumbersResponse,
  QueryNumberResponse,
  UnassignNumbers,
  UpdateCallbacks,
  AssignNumbers,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VoiceDomainApi } from '../voice-domain-api';

export interface QueryNumberRequestData {
  /** The phone number you want to query. */
  'number': string;
}
export interface GetCallbackURLsRequestData {
  /** The unique identifying key of the application. */
  'applicationkey': string;
}
export interface GetNumbersRequestData {
}
export interface UnassignNumberRequestData {
  /**  */
  'unassignNumbersRequestBody'?: UnassignNumbers;
}
export interface UpdateCallbackURLsRequestData {
  /** The unique identifying key of the application. */
  'applicationkey': string;
  /**  */
  'updateCallbacksRequestBody'?: UpdateCallbacks;
}
export interface AssignNumbersRequestData {
  /**  */
  'assignNumbersRequestBody'?: AssignNumbers;
}

export class ApplicationsApi extends VoiceDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'ApplicationsApi');
  }

  /**
   * Query number
   * Returns information about the requested number.
   * @param { QueryNumberRequestData } data - The data to provide to the API call.
   */
  public async queryNumber(data: QueryNumberRequestData): Promise<QueryNumberResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<QueryNumberRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    // Remove the spaces in the phone number in order to not have inconsistencies in the way the URL is encoded in the SDK and server side when calculating the request signature
    const path = `/v1/calling/query/number/${data['number'].split(' ').join('')}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<QueryNumberResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'QueryNumber',
    });
  }

  /**
   * Get Callback URLs
   * Returns any callback URLs configured for the specified application.
   * @param { GetCallbackURLsRequestData } data - The data to provide to the API call.
   */
  public async getCallbackURLs(data: GetCallbackURLsRequestData): Promise<GetCallbacks> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetCallbackURLsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/v1/configuration/callbacks/applications/${data['applicationkey']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<GetCallbacks>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCallbackURLs',
    });
  }

  /**
   * Get Numbers
   * Get information about your numbers. It returns a list of numbers that you own, as well as their capability (voice or SMS). For the ones that are assigned to an app, it returns the application key of the app.
   * @param { GetNumbersRequestData } data - The data to provide to the API call.
   */
  public async listNumbers(data: GetNumbersRequestData): Promise<ListNumbersResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetNumbersRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = '/v1/configuration/numbers';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ListNumbersResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetNumbers',
    });
  }

  /**
   * Un-assign number
   * Un-assign a number from an application.
   * @param { UnassignNumberRequestData } data - The data to provide to the API call.
   */
  public async unassignNumber(data: UnassignNumberRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UnassignNumberRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['unassignNumbersRequestBody']
      ? JSON.stringify(data['unassignNumbersRequestBody']) : '{}';
    const path = '/v1/configuration/numbers';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UnassignNumber',
    });
  }

  /**
   * Update Callbacks
   * Update the configured callback URLs for the specified application.
   * @param { UpdateCallbackURLsRequestData } data - The data to provide to the API call.
   */
  public async updateCallbackURLs(data: UpdateCallbackURLsRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateCallbackURLsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCallbacksRequestBody']
      ? JSON.stringify(data['updateCallbacksRequestBody']) : '{}';
    const path = `/v1/configuration/callbacks/applications/${data['applicationkey']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCallbackURLs',
    });
  }

  /**
   * Update Numbers
   * Assign a number or a list of numbers to an application.
   * @param { AssignNumbersRequestData } data - The data to provide to the API call.
   */
  public async assignNumbers(data: AssignNumbersRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<AssignNumbersRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['assignNumbersRequestBody']
      ? JSON.stringify(data['assignNumbersRequestBody']) : '{}';
    const path = '/v1/configuration/numbers';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateNumbers',
    });
  }

}
