import { PhoneNumber, GetPhoneNumberRequestData, ListPhoneNumbersRequestData } from '../../../models';
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

export class PhoneNumbersApi extends ElasticSipTrunkingDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'PhoneNumbersApi');
  }

  /**
   * Find a specific phone number
   * Search for an Elastic SIP Trunk-enabled phone number by the e.164 number.
   * @param { GetPhoneNumberRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetPhoneNumberRequestData): Promise<PhoneNumber> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetPhoneNumberRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/phoneNumbers/${data['phoneNumber']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<PhoneNumber>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetPhoneNumberByNumber',
    });
  }

  /**
   * Get all phone numbers
   * Get all phone numbers. You can filter and sort the phone numbers returned with paging.
   * @param { ListPhoneNumbersRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<PhoneNumber> }
   */
  public list(data: ListPhoneNumbersRequestData): ApiListPromise<PhoneNumber> {
    this.client = this.getSinchClient();
    data['page'] = data['page'] !== undefined ? data['page'] : 1;
    data['pageSize'] = data['pageSize'] !== undefined ? data['pageSize'] : 1000;
    const getParams = this.client.extractQueryParams<ListPhoneNumbersRequestData>(data, [
      'filter', 'sipTrunkIdQuery', 'page', 'pageSize', 'sort',
    ]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/phoneNumbers`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetPhoneNumbers',
      dataKey: 'phoneNumbers',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<PhoneNumber>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<PhoneNumber>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<PhoneNumber>;
  }

}
