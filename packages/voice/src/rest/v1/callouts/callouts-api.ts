import {
  CalloutRequest,
  GetCalloutResponseObj,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VoiceApi } from '../voice-api';

export interface CalloutsRequestData {
  /**  */
  'calloutRequestBody'?: CalloutRequest;
}

export class CalloutsApi extends VoiceApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CalloutsApi');
  }

  /**
   * Callout Request
   * Makes a call out to a phone number. The types of callouts currently supported are conference callouts, text-to-speech callouts, and custom callouts. The custom callout is the most flexible, but text-to-speech and conference callouts are more convenient.
   * @param { CalloutsRequestData } data - The data to provide to the API call.
   */
  public async callouts(data: CalloutsRequestData): Promise<GetCalloutResponseObj> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CalloutsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['calloutRequestBody'] ? JSON.stringify(data['calloutRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.basePath}/calling/v1/callouts`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<GetCalloutResponseObj>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'Callouts',
    });
  }

}
