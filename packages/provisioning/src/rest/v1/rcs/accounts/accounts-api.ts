import {
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  RequestBody,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import {
  CreateCommentRequestData,
  ListActivitiesRequestData,
  RcsAccountNotification,
  RcsComment,
} from '../../../../models';
import { ProvisioningDomainApi } from '../../provisioning-domain-api';
import { LazyProvisioningApiClient } from '../../provisioning-service';

export class RcsAccountsApi extends ProvisioningDomainApi {

  constructor(lazyApiClient: LazyProvisioningApiClient) {
    super(lazyApiClient, 'RcsAccountsApi');
  }

  /**
   * Creates a comment for an account
   * Creates a comment for an RCS account.
   * @param { CreateCommentRequestData } data - The data to provide to the API call.
   */
  public async createComment(data: CreateCommentRequestData): Promise<RcsComment> {
    const getParams = this.client.extractQueryParams<CreateCommentRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = data['rcsCommentCreateRequestBody']
      ? JSON.stringify(data['rcsCommentCreateRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/rcs/comments`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<RcsComment>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'createComment',
    });
  }

  /**
   * Lists activities on account
   * Paginated list of activities for an RCS account. Ordered from the most recent one to the oldest one.
   * @param { ListActivitiesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<RcsAccountNotification>}
   */
  public listActivities(data?: ListActivitiesRequestData): ApiListPromise<RcsAccountNotification> {
    const getParams = this.client.extractQueryParams<ListActivitiesRequestData>(
      data ?? {}, ['pageToken', 'pageSize']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/rcs/activities`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.TOKEN,
      apiName: this.apiName,
      operationId: 'listActivities',
      dataKey: 'notifications',
    };

    const listPromise = buildPageResultPromise<RcsAccountNotification>(
      this.client,
      requestOptionsPromise,
      operationProperties,
    );

    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<RcsAccountNotification>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<RcsAccountNotification>;
  }
}
