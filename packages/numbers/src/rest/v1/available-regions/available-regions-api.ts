import { ListAvailableRegionsResponse } from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { NumbersApi } from '../numbers-api';

export type RegionNumberTypeEnum = 'NUMBER_TYPE_UNSPECIFIED' | 'MOBILE' | 'LOCAL' | 'TOLL_FREE';

export interface ListAvailableRegionsRequestData {
  /** Only returns regions for which numbers are provided with the given types v1: `MOBILE`, `LOCAL` or `TOLL_FREE`. However, you can indicate `NUMBER_TYPE_UNSPECIFIED: null` when searching.
   * - NUMBER_TYPE_UNSPECIFIED: Null value
   * - MOBILE: Numbers that belong to a specific range.
   * - LOCAL: Numbers that are assigned to a specific geographic region.
   * - TOLL_FREE: Number that are free of charge for the calling party but billed for all arriving calls.
   */
  types?: RegionNumberTypeEnum;
}

export class AvailableRegionsApi extends NumbersApi {

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
    const basePathUrl = `${this.client.apiClientOptions.basePath}/v1/projects/${this.client.apiClientOptions.projectId}/availableRegions`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'GET',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<ListAvailableRegionsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ListAvailableRegions',
    });
  }

}
