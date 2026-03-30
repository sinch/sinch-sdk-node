import { CallBlockingRule, CreateBlockingRuleRequestData, DeleteBlockingRuleRequestData, ListBlockingRulesRequestData, UpdateBlockingRuleRequestData } from '../../../models';
import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
} from '@sinch/sdk-client';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';

export class CallBlockingRulesApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'CallBlockingRulesApi');
  }

  /**
   * Create call blocking rule
   * Create a call blocking rule for the specified project.
   * @param { CreateBlockingRuleRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateBlockingRuleRequestData): Promise<CallBlockingRule> {
    const getParams = this.client.extractQueryParams<CreateBlockingRuleRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createCallBlockingRuleRequestBody']
      ? JSON.stringify(data['createCallBlockingRuleRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callBlockingRules`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallBlockingRule>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateBlockingRule',
    });
  }

  /**
   * Delete blocking rule
   * Delete a call blocking rule using its ID.
   * @param { DeleteBlockingRuleRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteBlockingRuleRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteBlockingRuleRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callBlockingRules/${data['id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteBlockingRuleById',
    });
  }

  /**
   * Get call blocking rules
   * Return all the call blocking rules for the specified project.
   * @param { ListBlockingRulesRequestData } data - The data to provide to the API call.
   */
  public list(data?: ListBlockingRulesRequestData): ApiListPromise<CallBlockingRule> {
    const getParams = this.client.extractQueryParams<ListBlockingRulesRequestData>(data ?? {},
      ['page', 'size', 'sort']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callBlockingRules`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE2,
      apiName: this.apiName,
      operationId: 'GetBlockingRules',
      dataKey: 'callBlockingRules',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<CallBlockingRule>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<CallBlockingRule>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<CallBlockingRule>;
  }

  /**
   * Update blocking rule
   * Update the call blocking rule by the specified ID.
   * @param { UpdateBlockingRuleRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateBlockingRuleRequestData): Promise<CallBlockingRule> {
    const getParams = this.client.extractQueryParams<UpdateBlockingRuleRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCallBlockingRuleRequestBody']
      ? JSON.stringify(data['updateCallBlockingRuleRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callBlockingRules/${data['id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallBlockingRule>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateBlockingRuleById',
    });
  }

}
