import {
  ActiveNumber,
  ActiveNumberRequest,
  CapabilitiesEnum,
  NumberTypeEnum,
  SearchPatternEnum,
} from '../../../models';
import {
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  SinchClientParameters,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { NumbersApi } from '../numbers-api';

export interface GetActiveNumberRequestData {
  /** Output only. The phone number in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format with leading `+`. */
  phoneNumber: string;
}

export interface ListActiveNumbersRequestData {
  /** Region code to filter by. ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode: string;
  /** Number type to filter by. Options include, `MOBILE`, `LOCAL` or `TOLL_FREE`. */
  type: NumberTypeEnum;
  /** Sequence of digits to search for. If you prefer or need certain digits in sequential order, you can enter the sequence of numbers here. For example, `2020`. */
  'numberPattern.pattern'?: string;
  /** Search pattern to apply. The options are, `START`, `CONTAIN`, and `END`. */
  'numberPattern.searchPattern'?: SearchPatternEnum;
  /** Number capabilities to filter by, `SMS` or `VOICE`. */
  capability?: CapabilitiesEnum;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** The next page token value returned from a previous List request, if any. */
  pageToken?: string;
  /** Supported fields for ordering by `phoneNumber` or `displayName`. */
  orderBy?: string;
}
export interface ReleaseNumberRequestData {
  /** Output only. The phone number in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format with leading `+`. */
  phoneNumber: string;
}
export interface UpdateActiveNumberRequestData {
  /** Output only. The phone number in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format with leading `+`. */
  phoneNumber: string;
  /** The number body to be updated. */
  activeNumberRequestBody?: ActiveNumberRequest;
}

export class ActiveNumberApi extends NumbersApi {

  /**
   * Initialize your interface with the provided API client.
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'ActiveNumberApi');
  }

  /**
   * Get active Number
   * Get a virtual number
  * @param {GetActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async get(data: GetActiveNumberRequestData): Promise<ActiveNumber> {
    this.client = this.getSinchClient();
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
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

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
  public list(data: ListActiveNumbersRequestData): ApiListPromise<ActiveNumber> {
    this.client = this.getSinchClient();
    const getParams
      = this.client.extractQueryParams<ListActiveNumbersRequestData>(data, [
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
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers`;

    const requestOptionsPromise = this.client.prepareOptions(
      basePathUrl, 'GET', getParams, headers, body || undefined);

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
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ReleaseNumberRequestData>(
      data,
      [] as never[],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}:release`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'POST',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReleaseNumber',
    });
  }

  /**
   * Update active number
   * Update a virtual phone number. For example: you can configure SMS/Voice services or set a friendly name. To update the name that displays, modify the &#x60;displayName&#x60; parameter.
   * You'll use &#x60;smsConfiguration&#x60; to update your SMS configuration and &#x60;voiceConfiguration&#x60; to update the voice configuration.
   * @param {UpdateActiveNumberRequestData} data - The data to provide to the API call.
   */
  public async update(data: UpdateActiveNumberRequestData): Promise<ActiveNumber> {
    this.client = this.getSinchClient();
    const getParams
      = this.client.extractQueryParams<UpdateActiveNumberRequestData>(
        data,
        [] as never[],
      );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['activeNumberRequestBody']
      ? JSON.stringify(data['activeNumberRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/activeNumbers/${data['phoneNumber']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'PATCH',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ActiveNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateActiveNumber',
    });
  }
}
