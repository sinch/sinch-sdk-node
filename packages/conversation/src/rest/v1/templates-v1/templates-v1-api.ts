import {
  V1Template,
  V1ListTemplatesResponse,
  CreateTemplateRequestData,
  DeleteTemplateRequestData,
  GetTemplateRequestData,
  ListTemplatesRequestData,
  UpdateTemplateRequestData,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { ConversationDomainApi } from '../conversation-domain-api';

export class TemplatesV1Api extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'TemplatesV1Api');
  }

  /**
   * Creates a template
   *
   * @param { CreateTemplateRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateTemplateRequestData): Promise<V1Template> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['createTemplateRequestBody'] ? JSON.stringify(data['createTemplateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/templates`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V1Template>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateTemplate',
    });
  }

  /**
   * Delete a template.
   *
   * @param { DeleteTemplateRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteTemplateRequestData): Promise<any> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<any>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteTemplate',
    });
  }

  /**
   * Get a template
   *
   * @param { GetTemplateRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetTemplateRequestData): Promise<V1Template> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V1Template>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetTemplate',
    });
  }

  /**
   * List all templates belonging to a project ID.
   *
   * @param { ListTemplatesRequestData } data - The data to provide to the API call.
   */
  public async list(data: ListTemplatesRequestData): Promise<V1ListTemplatesResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListTemplatesRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/templates`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V1ListTemplatesResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListTemplates',
    });
  }

  /**
   * Updates a template.
   *
   * @param { UpdateTemplateRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateTemplateRequestData): Promise<V1Template> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateTemplateRequestData>(data, ['update_mask']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['updateTemplateRequestBody'] ? JSON.stringify(data['updateTemplateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V1Template>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateTemplate',
    });
  }

}
