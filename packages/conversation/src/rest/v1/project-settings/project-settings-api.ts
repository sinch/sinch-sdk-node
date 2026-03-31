import {
  RequestBody,
} from '@sinch/sdk-client';
import {
  CreateProjectSettingsRequestData,
  DeleteProjectSettingsRequestData,
  GetProjectSettingsRequestData,
  ProjectSettings, UpdateProjectSettingsRequestData,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';
import { LazyConversationApiClient } from '../conversation-service';

export class ProjectSettingsApi extends ConversationDomainApi {

  constructor(lazyApiClient: LazyConversationApiClient) {
    super(lazyApiClient, 'ProjectSettingsApi');
  }

  /**
   * Create Project Settings
   * Creates initial settings for the project. Useful for enabling features like Unified Contact ID. For new projects with no existing contacts, you can enable Unified Contact ID immediately.
   * @param { CreateProjectSettingsRequestData } data - The data to provide to the API call.
   */
  public async create(data: CreateProjectSettingsRequestData): Promise<ProjectSettings> {
    const getParams = this.client.extractQueryParams<CreateProjectSettingsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['createProjectSettingsRequestBody']
      ? JSON.stringify(data['createProjectSettingsRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/settings`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ProjectSettings>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CreateSettings',
    });
  }


  /**
   * Delete Project Settings
   * Deletes all project-level settings for the specified project.
   * @param { DeleteProjectSettingsRequestData } data - The data to provide to the API call.
   */
  public async delete(data: DeleteProjectSettingsRequestData): Promise<void> {
    const getParams = this.client.extractQueryParams<DeleteProjectSettingsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/settings`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeleteSettings',
    });
  }


  /**
   * Get Project Settings
   * Retrieves the current settings for the specified project, including contact management options such as Unified Contact ID.
   * @param { GetProjectSettingsRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetProjectSettingsRequestData): Promise<ProjectSettings> {
    const getParams = this.client.extractQueryParams<GetProjectSettingsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/settings`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ProjectSettings>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetSettings',
    });
  }


  /**
   * Update Project Settings
   * Updates project settings (e.g. enabling/disabling Unified Contact ID). For existing projects, you must resolve all identity conflicts before enabling Unified Contact ID.
   * @param { UpdateProjectSettingsRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateProjectSettingsRequestData): Promise<ProjectSettings> {
    const getParams = this.client.extractQueryParams<UpdateProjectSettingsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateProjectSettingsRequestBody']
      ? JSON.stringify(data['updateProjectSettingsRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/settings`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ProjectSettings>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateSettings',
    });
  }


}
