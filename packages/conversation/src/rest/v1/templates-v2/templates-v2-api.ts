import {
  V2ListTemplatesResponse,
  V2ListTranslationsResponse,
  V2Template,
  V2TemplateResponse,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface V2CreateTemplateRequestData {
  /** Required. The template to create. */
  'createTemplateRequestBody': V2Template;
}
export interface V2DeleteTemplateRequestData {
  /** Required. The ID of the template to delete. */
  'template_id': string;
}
export interface V2GetTemplateRequestData {
  /** Required. The ID of the template to fetch. */
  'template_id': string;
}
export interface V2ListTemplatesRequestData {
}
export interface V2ListTranslationsRequestData {
  /** Required. The template ID. */
  'template_id': string;
  /** Optional. The translation's language code. */
  'language_code'?: string;
  /** Optional. The translation's version. */
  'translation_version'?: string;
}
export interface V2UpdateTemplateRequestData {
  /** The id of the template to be updated. Specified or automatically generated during template creation. Unique per project. */
  'template_id': string;
  /** Required. The updated template. */
  'updateTemplateRequestBody': V2Template;
}

export class TemplatesV2Api extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'TemplatesV2Api');
  }

  /**
   * Creates a template
   *
   * @param { V2CreateTemplateRequestData } data - The data to provide to the API call.
   */
  public async create(data: V2CreateTemplateRequestData): Promise<V2TemplateResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2CreateTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['createTemplateRequestBody'] ? JSON.stringify(data['createTemplateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V2TemplateResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2CreateTemplate',
    });
  }

  /**
   * Delete a template.
   *
   * @param { V2DeleteTemplateRequestData } data - The data to provide to the API call.
   */
  public async delete(data: V2DeleteTemplateRequestData): Promise<any> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2DeleteTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<any>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2DeleteTemplate',
    });
  }

  /**
   * Get a template
   *
   * @param { V2GetTemplateRequestData } data - The data to provide to the API call.
   */
  public async get(data: V2GetTemplateRequestData): Promise<V2TemplateResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2GetTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V2TemplateResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2GetTemplate',
    });
  }

  /**
   * List all templates belonging to a project ID.
   *
   * @param { V2ListTemplatesRequestData } data - The data to provide to the API call.
   */
  public async list(data: V2ListTemplatesRequestData): Promise<V2ListTemplatesResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2ListTemplatesRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V2ListTemplatesResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2ListTemplates',
    });
  }

  /**
   * List translations for a template
   *
   * @param { V2ListTranslationsRequestData } data - The data to provide to the API call.
   */
  public async listTranslations(data: V2ListTranslationsRequestData): Promise<V2ListTranslationsResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2ListTranslationsRequestData>(
      data,
      ['language_code', 'translation_version']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}/translations`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V2ListTranslationsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2ListTranslations',
    });
  }

  /**
   * Updates a template.
   *
   * @param { V2UpdateTemplateRequestData } data - The data to provide to the API call.
   */
  public async update(data: V2UpdateTemplateRequestData): Promise<V2TemplateResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<V2UpdateTemplateRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['updateTemplateRequestBody'] ? JSON.stringify(data['updateTemplateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/templates/${data['template_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<V2TemplateResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'V2UpdateTemplate',
    });
  }

}
