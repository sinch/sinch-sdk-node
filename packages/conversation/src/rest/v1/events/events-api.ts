import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  SendEventRequest,
  SendEventResponse,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';

export interface SendEventRequestData {
  /** The event to be sent. */
  'sendEventRequestBody': SendEventRequest;
}

export class EventsApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'EventsApi');
  }

  /**
   * Send an event
   * Sends an event to the referenced contact from the referenced app. Note that this operation enqueues the event in a queue so a successful response only indicates that the event has been queued.
   * @param { SendEventRequestData } data - The data to provide to the API call.
   */
  public async send(data: SendEventRequestData): Promise<SendEventResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<SendEventRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['sendEventRequestBody'] ? JSON.stringify(data['sendEventRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/events:send`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<SendEventResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'SendEvent',
    });
  }

}
