import { ListAvailableRegionsRequestData, ListAvailableRegionsResponse } from '../../../models';
import { RequestBody } from '@sinch/sdk-client';
import { NumbersDomainApi } from '../numbers-domain-api';
import { LazyNumbersApiClient } from '../numbers-service';

export class AvailableRegionsApi extends NumbersDomainApi {

  constructor(lazyClient: LazyNumbersApiClient) {
    super(lazyClient, 'AvailableRegionsApi');
  }

  /**
   * List available regions
   * Lists all regions for numbers provided for the project ID.
   * @param {ListAvailableRegionsRequestData} data - The data to provide to the API call.
   */
  public async list(data: ListAvailableRegionsRequestData): Promise<ListAvailableRegionsResponse> {
    const client = this.client;
    const getParams
      = client.extractQueryParams<ListAvailableRegionsRequestData>(data, [
        'types',
      ]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${client.apiClientOptions.hostname}/v1/projects/${client.apiClientOptions.projectId}/availableRegions`;

    const requestOptions = await client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = client.prepareUrl(requestOptions.hostname, requestOptions.queryParams, true);

    return client.processCall<ListAvailableRegionsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListAvailableRegions',
    });
  }

}
