import {
  CallbackConfiguration,
  GetCallbackConfigurationRequestData,
  UpdateCallbackConfigurationRequestData,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { NumbersDomainApi } from '../numbers-domain-api';

export class CallbacksApi extends NumbersDomainApi {

  /**
   * Initialize your interface with the provided API client.
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CallbacksApi');
  }

  /**
   * Get callbacks configuration
   * Returns the callbacks configuration for the specified project
   * @param {GetCallbackConfigurationRequestData} data - The data to provide to the API call.
   */
  public async get(data: GetCallbackConfigurationRequestData): Promise<CallbackConfiguration> {
    this.client = this.getSinchClient();
    const getParams
      = this.client.extractQueryParams<GetCallbackConfigurationRequestData>(
        data,
        [] as never[],
      );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callbackConfiguration`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallbackConfiguration>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCallbackConfiguration',
    });
  }

  /**
   * Update callback configuration
   * Updates the callbacks configuration for the specified project
   * @param {UpdateCallbackConfigurationRequestData} data - The data to provide to the API call.
   */
  public async update(data: UpdateCallbackConfigurationRequestData): Promise<CallbackConfiguration> {
    this.client = this.getSinchClient();
    const getParams
      = this.client.extractQueryParams<UpdateCallbackConfigurationRequestData>(
        data,
        [] as never[],
      );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCallbackConfigurationRequestBody']
      ? JSON.stringify(data['updateCallbackConfigurationRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/callbackConfiguration`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'PATCH',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CallbackConfiguration>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCallbackConfiguration',
    });
  }
}
