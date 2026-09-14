import { RequestBody } from '@sinch/sdk-client';
import {
  GetSessionByIdRequestData,
  Session,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class SessionsApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'SessionsApi');
  }

  /**
   * Get a session details by the session ID
   * Retrieve detailed information about a specific session, including all associated calls and their current states. Sessions represent the complete interaction lifecycle and can contain multiple related calls.
   * @param { GetSessionByIdRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetSessionByIdRequestData): Promise<Session> {
    const getParams = this.client.extractQueryParams<GetSessionByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/sessions/${data['sessionId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<Session>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getSessionById',
    });
  }

}
