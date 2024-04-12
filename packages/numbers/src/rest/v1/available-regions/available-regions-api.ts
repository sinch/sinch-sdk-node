import { ListAvailableRegionsRequestData, ListAvailableRegionsResponse } from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { NumbersDomainApi } from '../numbers-domain-api';

export class AvailableRegionsApi extends NumbersDomainApi {

  /**
   * Initialize your interface with the provided API client.
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'AvailableRegionsApi');
  }

  /**
   * List available regions
   * Lists all regions for numbers provided for the project ID.
   * @param {ListAvailableRegionsRequestData} data - The data to provide to the API call.
   */
  public async list(data: ListAvailableRegionsRequestData): Promise<ListAvailableRegionsResponse> {
    this.client = this.getSinchClient();
    const getParams
      = this.client.extractQueryParams<ListAvailableRegionsRequestData>(data, [
        'types',
      ]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/availableRegions`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams, true);

    return this.client.processCall<ListAvailableRegionsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListAvailableRegions',
    });
  }

}
