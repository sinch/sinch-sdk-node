import {
  ConferenceCalloutRequest,
  CustomCalloutRequest,
  CalloutResponse,
  TtsCalloutRequest,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VoiceDomainApi } from '../voice-domain-api';

export interface TtsCalloutRequestData {
  'ttsCalloutRequestBody': {
    /** Type of callout. */
    method: 'ttsCallout',
    /** @see TtsCalloutRequest */
    ttsCallout: TtsCalloutRequest
  }
}

export interface ConferenceCalloutRequestData {
  'conferenceCalloutRequestBody': {
    /** Type of callout. */
    method: 'conferenceCallout',
    /** @see ConferenceCalloutRequest */
    conferenceCallout: ConferenceCalloutRequest
  }
}

export interface CustomCalloutRequestData {
  'customCalloutRequestBody': {
    /** Type of callout. */
    method: 'customCallout',
    /** @see CustomCalloutRequest */
    customCallout: CustomCalloutRequest
  }
}

export class CalloutsApi extends VoiceDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CalloutsApi');
  }

  /**
   * TTS Callout Request
   * Makes a text-to-speech callout to a phone number.
   * @param { TtsCalloutRequestData } data - The data to provide to the API call.
   */
  public async tts(data: TtsCalloutRequestData): Promise<CalloutResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<TtsCalloutRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['ttsCalloutRequestBody'] ? JSON.stringify(data['ttsCalloutRequestBody']) : '{}';
    const path = `/calling/v1/callouts`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CalloutResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'Callouts',
    });
  }

  /**
   * Conference Callout Request
   * Makes a conference callout to a phone number.
   * @param { ConferenceCalloutRequestData } data - The data to provide to the API call.
   */
  public async conference(data: ConferenceCalloutRequestData): Promise<CalloutResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ConferenceCalloutRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['conferenceCalloutRequestBody'] ? JSON.stringify(data['conferenceCalloutRequestBody']) : '{}';
    const path = `/calling/v1/callouts`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CalloutResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'Callouts',
    });
  }

  /**
   * Custom Callout Request
   * Makes a conference callout to a phone number.
   * @param { CustomCalloutRequestData } data - The data to provide to the API call.
   */
  public async custom(data: CustomCalloutRequestData): Promise<CalloutResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CustomCalloutRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['customCalloutRequestBody'] ? JSON.stringify(data['customCalloutRequestBody']) : '{}';
    const path = `/calling/v1/callouts`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CalloutResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'Callouts',
    });
  }

}
