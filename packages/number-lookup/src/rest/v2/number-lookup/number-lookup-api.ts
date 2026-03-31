import { RequestBody } from '@sinch/sdk-client';
import { NumberLookupDomainApi } from '../number-lookup-domain-api';
import { LazyNumberLookupApiClient } from '../number-lookup-service';
import { NumberLookupRequestData, NumberLookupResponse } from '../../../models';

export class NumberLookupApi extends NumberLookupDomainApi {

  constructor(lazyApiClient: LazyNumberLookupApiClient) {
    super(lazyApiClient, 'NumberLookupApi');
  }

  /**
   * Performs a number lookup.
   *
   * @param { NumberLookupRequestData } data - The data to provide to the API call.
   */
  public async lookup(data: NumberLookupRequestData): Promise<NumberLookupResponse> {
    const getParams = this.client.extractQueryParams<NumberLookupRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const body: RequestBody = data['numberLookupRequestBody'] ? JSON.stringify(data['numberLookupRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/lookups`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<NumberLookupResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'numberLookup',
    });
  }
}
