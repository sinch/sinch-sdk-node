import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  AppCreateRequest,
  AppResponse,
  AppUpdateRequest,
  ListAppsResponse,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface CreateAppRequestData {
  /** The app to create. */
  'appCreateRequestBody': AppCreateRequest;
}
export interface DeleteAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
}
export interface GetAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
}
export interface ListAppsRequestData {
}
export interface UpdateAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
  /** The updated app. */
  'appUpdateRequestBody': AppUpdateRequest;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}

export class AppApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'AppApi');
  }

  /**
   * Create an app
   * You can create a new Conversation API app using the API. You can create an app for one or more channels at once. The ID of the app is generated at creation and will be returned in the response.
   * @param { CreateAppRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateAppRequestData): Promise<AppResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CreateAppRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['appCreateRequestBody'] ? JSON.stringify(data['appCreateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/apps`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<AppResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateApp',
    });
  }

  /**
   * Delete an app
   * Deletes the app specified by the App ID. Note that this operation will not delete contacts (which are stored at the project level) nor any channel-specific resources (for example, WhatsApp Sender Identities will not be deleted).
   * @param { DeleteAppRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteAppRequestData): Promise<any> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeleteAppRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/apps/${data['app_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<any>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteApp',
    });
  }

  /**
   * Get an app
   * Returns a particular app as specified by the App ID.
   * @param { GetAppRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetAppRequestData): Promise<AppResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetAppRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/apps/${data['app_id']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<AppResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetApp',
    });
  }

  /**
   * List all apps for a given project
   * Get a list of all apps in the specified project.
   * @param { ListAppsRequestData } data - The data to provide to the API call.
   */
  public async list(data: ListAppsRequestData): Promise<ListAppsResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListAppsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/apps`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ListAppsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListApps',
    });
  }

  /**
   * Update an app
   * Updates a particular app as specified by the App ID. Note that this is a &#x60;PATCH&#x60; operation, so any specified field values will replace existing values. Therefore, **if you\&#39;d like to add additional configurations to an existing Conversation API app, ensure that you include existing values AND new values in the call**. For example, if you\&#39;d like to add new &#x60;channel_credentials&#x60;, you can [get](/docs/conversation/api-reference/conversation/tag/App/#tag/App/operation/App_GetApp) your existing Conversation API app, extract the existing &#x60;channel_credentials&#x60; list, append your new configuration to that list, and include the updated &#x60;channel_credentials&#x60; list in this update call.
   * @param { UpdateAppRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateAppRequestData): Promise<AppResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateAppRequestData>(data, ['update_mask']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['appUpdateRequestBody'] ? JSON.stringify(data['appUpdateRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/apps/${data['app_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams, false, ',');

    return this.client.processCall<AppResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateApp',
    });
  }

}
