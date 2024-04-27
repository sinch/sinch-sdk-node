import { Call, FindCallsRequestData } from '../../../models';
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

export class CallsHistoryApi extends ElasticSipTrunkingDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CallsHistoryApi');
  }

  /**
   * Find calls
   * Find calls by query parameters.
   * @param { FindCallsRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<Call> }
   */
  public find(data: FindCallsRequestData): ApiListPromise<Call> {
    this.client = this.getSinchClient();
    data['createTime'] = data['createTime'] !== undefined ? data['createTime'] : 'now-24h';
    const getParams = this.client.extractQueryParams<FindCallsRequestData>(data, [
      'from', 'to', 'trunkId', 'createTime', 'callResult', 'direction', 'page', 'pageSize']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/calls`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'FindCalls',
      dataKey: 'calls',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<Call>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<Call>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<Call>;
  }

}
