import {
  GetCallInformation,
  GetCallResultRequestData,
  ManageWithCallLegRequestData,
  UpdateCallRequestData,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VoiceDomainApi } from '../voice-domain-api';

export class CallsApi extends VoiceDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CallsApi');
  }

  /**
   * Get information about a call
   * You can retrieve information about an ongoing or completed call using a call ID. You can find the call ID of an ongoing call by viewing the response object from a callout request. You can find the call ID of a completed call by looking at your call logs in your Sinch [Dashboard](https://dashboard.sinch.com/voice/logs).  Note: You can only use this method for calls that terminate to PSTN or SIP networks from an In-app call.
   * @param { GetCallResultRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetCallResultRequestData): Promise<GetCallInformation> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetCallResultRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/calling/v1/calls/id/${data['callId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
        = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<GetCallInformation>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCallResult',
    });
  }

  /**
   * Manage Call with &#x60;callLeg&#x60;
   * This method is used to manage ongoing, connected calls. This method is only used when using the &#x60;PlayFiles&#x60; and &#x60;Say&#x60; instructions in the request body. This method uses SVAML in the request body to perform various tasks related to the call. For more information about SVAML, see the [Callback API](/docs/voice/api-reference/svaml/) documentation.  Note: You can only use this method for calls that originate from or terminate to PSTN or SIP networks.
   * @param { ManageWithCallLegRequestData } data - The data to provide to the API call.
   */
  public async manageWithCallLeg(data: ManageWithCallLegRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ManageWithCallLegRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['manageWithCallLegRequestBody']
      ? JSON.stringify(data['manageWithCallLegRequestBody'])
      : '{}';
    const path = `/calling/v1/calls/id/${data['callId']}/leg/${data['callLeg']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ManageCallWithCallLeg',
    });
  }

  /**
   * Update a call in progress
   * This method is used to manage ongoing, connected calls. This method uses SVAML in the request body to perform various tasks related to the call. For more information about SVAML, see the [Callback API](/docs/voice/api-reference/svaml/) documentation.  This method can only be used for calls that originate from or terminate to PSTN or SIP networks.
   * @param { UpdateCallRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateCallRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateCallRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCallRequestBody'] ? JSON.stringify(data['updateCallRequestBody']) : '{}';
    const path = `/calling/v1/calls/id/${data['callId']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PATCH', getParams, headers, body, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCall',
    });
  }

}
