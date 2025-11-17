import {
  RequestBody,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  formatCreateTimeFilter,
  formatCreateTimeRangeFilter,
} from '@sinch/sdk-client';
import { Call, FindCallsRequestData } from '../../../models';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';

export class CallsHistoryApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'CallsHistoryApi');
  }

  /**
   * Find calls by query parameters.
   * @param { FindCallsRequestData } data - The data to provide to the API call.
   * @return { ApiListPromise<Call> }
   */
  public find(data: FindCallsRequestData): ApiListPromise<Call> {
    const getParams = this.client.extractQueryParams<FindCallsRequestData>(data, [
      'from', 'to', 'trunkId', 'createTime', 'callResult', 'direction', 'page', 'pageSize']);
    (getParams as any).createTime = JSON.stringify(formatCreateTimeFilter(data.createTime));
    (getParams as any)['createTime>'] = JSON.stringify(formatCreateTimeRangeFilter(data.createTimeRange?.from));
    (getParams as any)['createTime<'] = JSON.stringify(formatCreateTimeRangeFilter(data.createTimeRange?.to));

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
