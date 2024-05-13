import {
  CountryPermission,
  ListCountryPermissionsResponse,
  GetCountryPermissionRequestData,
  ListCountryPermissionsRequestData,
  UpdateCountryPermissionRequestData,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { ElasticSipTrunkingDomainApi } from '../elastic-sip-trunking-domain-api';

export class CountryPermissionsApi extends ElasticSipTrunkingDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'CountryPermissionsApi');
  }

  /**
   * Fetch country permission
   * Fetches the requested country permission.
   * @param { GetCountryPermissionRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetCountryPermissionRequestData): Promise<CountryPermission> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetCountryPermissionRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/countryPermissions/${data['isoCode']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CountryPermission>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCountryPermission',
    });
  }

  /**
   * Fetch all country permissions
   * Fetches the list of country permissions.
   * @param { ListCountryPermissionsRequestData } data - The data to provide to the API call.
   */
  public async list(data: ListCountryPermissionsRequestData): Promise<ListCountryPermissionsResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListCountryPermissionsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/countryPermissions`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ListCountryPermissionsResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetCountryPermissions',
    });
  }

  /**
   * Update country permission
   * Update the requested country permission.
   * @param { UpdateCountryPermissionRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateCountryPermissionRequestData): Promise<CountryPermission> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateCountryPermissionRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['updateCountryPermissionRequestBody']
      ? JSON.stringify(data['updateCountryPermissionRequestBody'])
      : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v1/projects/${this.client.apiClientOptions.projectId}/countryPermissions/${data['isoCode']}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CountryPermission>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateCountryPermission',
    });
  }


}
