import {
  GetPhoneNumberRequestData,
  ListPhoneNumbersRequestData,
  PhoneNumber,
} from '../../../models';
import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
} from '@sinch/sdk-client';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';

export class PhoneNumbersApi extends ElasticSipTrunkingDomainApi {

  /** @internal */
  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'PhoneNumbersApi');
  }

  /**
   * Find a specific phone number
   * Search for an Elastic SIP Trunk-enabled phone number by the e.164 number.
   * @param { GetPhoneNumberRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetPhoneNumberRequestData): Promise<PhoneNumber> {
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
      operationId: 'GetPhoneNumber',
    });
  }

  /**
   * Get all phone numbers
   * Get all phone numbers. You can filter the phone numbers returned with paging.
   * @param { ListPhoneNumbersRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<PhoneNumber> }
   */
  public list(data?: ListPhoneNumbersRequestData): ApiListPromise<PhoneNumber> {
    const getParams = this.client.extractQueryParams<ListPhoneNumbersRequestData>(data ?? {},
      ['sipTrunkId', 'page', 'size']);
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

    const listPromise = buildPageResultPromise<PhoneNumber>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<PhoneNumber>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<PhoneNumber>;
  }

}
