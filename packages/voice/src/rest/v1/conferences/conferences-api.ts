import {
  CalloutResponse,
  ConferenceCalloutRequestData,
  GetConferenceInfoRequestData,
  GetConferenceInfoResponse,
  KickAllRequestData,
  KickParticipantRequestData,
  ManageParticipantRequestData,
} from '../../../models/';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VoiceDomainApi } from '../voice-domain-api';
import { CalloutsApi } from '../callouts';

export class ConferencesApi extends VoiceDomainApi {

  private calloutApi: CalloutsApi;

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'ConferencesApi');
    this.calloutApi = new CalloutsApi(sinchClientParameters);
  }

  /**
   * Conference Callout Request
   * Makes a conference callout to a phone number.
   * @param { ConferenceCalloutRequestData } data - The data to provide to the API call.
   */
  public async call(data: ConferenceCalloutRequestData): Promise<CalloutResponse> {
    return this.calloutApi.conference(data);
  }

  /**
   * Get Conference Info
   * Returns information about a conference that matches the provided conference ID.
   * @param { GetConferenceInfoRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetConferenceInfoRequestData): Promise<GetConferenceInfoResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetConferenceInfoRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/calling/v1/conferences/id/${data['conferenceId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<GetConferenceInfoResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetConferenceInfo',
    });
  }

  /**
   * Kick Conference All
   * Removes all participants from a conference.
   * @param { KickAllRequestData } data - The data to provide to the API call.
   */
  public async kickAll(data: KickAllRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<KickAllRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/calling/v1/conferences/id/${data['conferenceId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'KickConferenceAll',
    });
  }

  /**
   * Kick Conference Participant
   * Remove a specified conference participant from a specified conference.
   * @param { KickParticipantRequestData } data - The data to provide to the API call.
   */
  public async kickParticipant(data: KickParticipantRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<KickParticipantRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/calling/v1/conferences/id/${data['conferenceId']}/${data['callId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'KickConferenceParticipant',
    });
  }

  /**
   * Manage Conference Participant
   * Manages conference participant in a specified conference: * mute / unmute * put on hold / resume.
   * @param { ManageParticipantRequestData } data - The data to provide to the API call.
   */
  public async manageParticipant(data: ManageParticipantRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ManageParticipantRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['manageParticipantRequestBody']
      ? JSON.stringify(data['manageParticipantRequestBody']) : '{}';
    const path = `/calling/v1/conferences/id/${data['conferenceId']}/${data['callId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ManageConferenceParticipant',
    });
  }

}
