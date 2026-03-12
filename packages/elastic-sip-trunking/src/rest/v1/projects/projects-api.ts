import { RequestBody } from '@sinch/sdk-client';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';
import { LazyElasticSipTrunkingApiClient } from '../elastic-sip-trunking-service';
import { AddProjectsRequestData, AddProjectsResponse } from '../../../models';

export class ProjectsApi extends ElasticSipTrunkingDomainApi {

  constructor(lazyClient: LazyElasticSipTrunkingApiClient) {
    super(lazyClient, 'SipProjectsApi');
  }

  /**
   * Add additional projects to EST
   * Programmatically add additional projects for use with Elastic SIP Trunking. If you list a project ID which EST is already aware of, it will be ignored.
   * @param { AddProjectsRequestData } data - The data to provide to the API call.
   */
  public async add(data: AddProjectsRequestData): Promise<AddProjectsResponse> {
    const getParams = this.client.extractQueryParams<AddProjectsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['addProjectsRequestBody'] ? JSON.stringify(data['addProjectsRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/addProjects`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<AddProjectsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'AddEstProjects',
    });
  }

}
