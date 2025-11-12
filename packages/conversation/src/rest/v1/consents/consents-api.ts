import {
  ApiListPromise,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
} from '@sinch/sdk-client';
import {
  ListAuditRecordsRequestData,
  ListIdentitiesRequestData,
  AuditRecordsList,
  ConsentIdentity,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';
import { LazyConversationApiClient } from '../conversation-service';

export class ConsentsApi extends ConversationDomainApi {

  constructor(lazyApiClient: LazyConversationApiClient) {
    super(lazyApiClient, 'ConsentsApi');
  }

  /**
   * Get identities from consent list
   * Get all identities contained within a consent list for a given project id, app id, and list type.
   * @param { ListIdentitiesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<ConsentIdentity>}
   */
  public listIdentities(data: ListIdentitiesRequestData): ApiListPromise<ConsentIdentity> {
    const getParams = this.client.extractQueryParams<ListIdentitiesRequestData>(data, ['page_size', 'page_token']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/apps/${data['app_id']}/consents/${data['list_type']}`;

    const requestOptionsPromise = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.TOKEN2,
      apiName: this.apiName,
      operationId: 'ListIdentitiesFromConsentsList',
      dataKey: 'identities',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<ConsentIdentity>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<ConsentIdentity>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<ConsentIdentity>;
  }


  /**
   * Get audit records from consent lists
   * Get all audit records associated with the given identity from the consent lists within the specified project and app.
   * @param { ListAuditRecordsRequestData } data - The data to provide to the API call.
   */
  public async listAuditRecords(data: ListAuditRecordsRequestData): Promise<AuditRecordsList> {
    const getParams = this.client.extractQueryParams<ListAuditRecordsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/apps/${data['app_id']}/consents/identities/${data['identity']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AuditRecordsList>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListAuditRecordsFromConsentsList',
    });
  }

}
