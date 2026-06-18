import { RequestBody } from '@sinch/sdk-client';
import {
  CreateWebhookRequestData,
  DeleteWebhookRequestData,
  GetWebhookRequestData,
  ListWebhooksRequestData,
  ListWebhooksResponse,
  ReplaceWebhookRequestData,
  UpdateWebhookRequestData,
  Webhook,
} from '../../../models';
import { ProvisioningDomainApi } from '../provisioning-domain-api';
import { LazyProvisioningApiClient } from '../provisioning-service';

export class WebhooksApi extends ProvisioningDomainApi {

  constructor(lazyApiClient: LazyProvisioningApiClient) {
    super(lazyApiClient, 'WebhooksApi');
  }

  /**
   * Delete webhook
   * Deletes an already created webhook.
   * @param { DeleteWebhookRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteWebhookRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteWebhookRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks/${data['webhookId']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'DELETE',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'delete',
    });
  }

  /**
   * Register a webhook for project
   * Register a new webhook for a project. Maximum of 15 webhooks allowed per project.
   * @param { CreateWebhookRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateWebhookRequestData): Promise<Webhook> {
    const getParams = this.client.extractQueryParams<CreateWebhookRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = data['webhookCreateRequestBody']
      ? JSON.stringify(data['webhookCreateRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Webhook>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'create',
    });
  }

  /**
   * Get webhook
   * Return an already created webhook.
   * @param { GetWebhookRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetWebhookRequestData): Promise<Webhook> {
    const getParams = this.client.extractQueryParams<GetWebhookRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks/${data['webhookId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Webhook>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'get',
    });
  }

  /**
   * List all webhooks in project
   * Returns a paginated list of webhooks for the specified project.
   * @param { ListWebhooksRequestData } data - The data to provide to the API call.
   */
  public async list(data: ListWebhooksRequestData): Promise<ListWebhooksResponse> {
    const getParams = this.client.extractQueryParams<ListWebhooksRequestData>(data, ['pageToken', 'pageSize']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ListWebhooksResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'list',
    });
  }

  /**
   * Replace webhook
   * Replace an already existing webhook.
   * @param { ReplaceWebhookRequestData } data - The data to provide to the API call.
   */
  public async replace(data: ReplaceWebhookRequestData): Promise<Webhook> {
    const getParams = this.client.extractQueryParams<ReplaceWebhookRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = data['webhookReplaceRequestBody']
      ? JSON.stringify(data['webhookReplaceRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks/${data['webhookId']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Webhook>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'replace',
    });
  }

  /**
   * Update webhook
   * Update an already existing webhook.
   * @param { UpdateWebhookRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateWebhookRequestData): Promise<Webhook> {
    const getParams = this.client.extractQueryParams<UpdateWebhookRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = data['webhookUpdateRequestBody']
      ? JSON.stringify(data['webhookUpdateRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/webhooks/${data['webhookId']}`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'PATCH',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Webhook>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'update',
    });
  }
}
