import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  TranscodeMessageRequestData,
  TranscodeMessageResponse,
} from '../../../models';
import { ConversationDomainApi } from '../conversation-domain-api';


export class TranscodingApi extends ConversationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'TranscodingApi');
  }

  /**
   * Transcode a message
   * Transcodes the message from the Conversation API format to the channel-specific formats for the requested channels. No message is sent to the contact.
   * @param { TranscodeMessageRequestData } data - The data to provide to the API call.
   */
  public async transcodeMessage(data: TranscodeMessageRequestData): Promise<TranscodeMessageResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<TranscodeMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['transcodeMessageRequestBody'] ? JSON.stringify(data['transcodeMessageRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/messages:transcode`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<TranscodeMessageResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'TranscodeMessage',
    });
  }

}
