import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  LookupCapability,
  QueryCapabilityResponse,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface LookupCapabilityRequestData {
  /** The lookup capability request. */
  'lookupCapabilityRequestBody': LookupCapability;
}

export class CapabilityApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CapabilityApi');
  }

  /**
   * Capability lookup
   * This method is asynchronous - it immediately returns the requested Capability registration. Capability check is then delivered as a callback to registered webhooks with trigger CAPABILITY for every reachable channel.
   * @param { LookupCapabilityRequestData } data - The data to provide to the API call.
   */
  public async lookup(data: LookupCapabilityRequestData): Promise<QueryCapabilityResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<LookupCapabilityRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['lookupCapabilityRequestBody']
      ? JSON.stringify(data['lookupCapabilityRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/capability:query`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<QueryCapabilityResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'QueryCapability',
    });
  }

}
