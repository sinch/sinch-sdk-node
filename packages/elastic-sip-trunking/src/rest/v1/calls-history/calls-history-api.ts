import {
  RequestBody,
  ApiListPromise,
  CSVFile,
  PaginatedApiProperties,
  PaginationEnum,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  formatCreateTimeFilter,
  formatCreateTimeRangeFilter,
} from '@sinch/sdk-client';
import { Call, ExportCallRecordsRequestData, FindCallsRequestData } from '../../../models';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';

export class CallsHistoryApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'CallsHistoryApi');
  }

  /**
   * Export call records
   * Export call records for a project. This returns a comma separate value (CSV) response. You can specify which records to export using the query parameters.
   * @param { ExportCallRecordsRequestData } data - The data to provide to the API call.
   */
  public async export(data: ExportCallRecordsRequestData): Promise<CSVFile> {
    const getParams = this.client.extractQueryParams<ExportCallRecordsRequestData>(data,
      ['from',
        'to',
        'trunkId',
        'createTime',
        'callResult',
        'direction',
        'page',
        'size',
        'fromCountryCode',
        'toCountryCode',
        'emergencyOnly',
        'region',
        'projectIds',
        'fileName',
        'groupId',
        'parentId',
        'relationshipType',
        'hasChildren']);
    (getParams as any).createTime = JSON.stringify(formatCreateTimeFilter(data.createTime));
    (getParams as any)['createTime>'] = JSON.stringify(formatCreateTimeRangeFilter(data.createTimeRange?.from));
    (getParams as any)['createTime<'] = JSON.stringify(formatCreateTimeRangeFilter(data.createTimeRange?.to));
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/calls/export`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCsvCall({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ExportCallRecords',
    });
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
