import { RequestBody } from '@sinch/sdk-client';
import {
  CallResponse,
  CreateCallRequestData,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class CallsApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'CallsApi');
  }

  /**
   * Create and initiate a new outbound voice call
   * Create a new outbound call associated to the project's default service
   * or to the service specified in the `serviceId` query parameter.
   * @param { CreateCallRequestData } data - The data to provide to the API call.
   */
  public async start(data: CreateCallRequestData): Promise<CallResponse> {
    const getParams = this.client.extractQueryParams<CreateCallRequestData>(data, ['serviceId']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'],
    };

    const body: RequestBody = data['createCallRequestBody']
      ? JSON.stringify(data['createCallRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'createCall',
    });
  }

}
