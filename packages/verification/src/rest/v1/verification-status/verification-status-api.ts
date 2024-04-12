import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import {
  VerificationReportResponse,
  VerificationStatusByIdentityRequestData,
  VerificationStatusByIdRequestData,
  VerificationStatusByReferenceRequestData,
} from '../../../models';
import { VerificationDomainApi } from '../verification-domain-api';

export class VerificationStatusApi extends VerificationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'VerificationStatusApi');
  }

  /**
   * Get verification by ID
   * Queries the verification result by sending the verification ID. With this query you can get the result of a verification.
   * @param { VerificationStatusByIdRequestData } data - The data to provide to the API call.
   */
  public async getById(data: VerificationStatusByIdRequestData): Promise<VerificationReportResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<VerificationStatusByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/verification/v1/verifications/id/${data['id']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<VerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'VerificationStatusById',
    });
  }

  /**
   * Get verification by Identity
   * Queries the verification result by sending the verification Identity (usually a phone number) and its method. With this query you can get the result of a verification.
   * @param { VerificationStatusByIdentityRequestData } data - The data to provide to the API call.
   */
  public async getByIdentity(data: VerificationStatusByIdentityRequestData): Promise<VerificationReportResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<VerificationStatusByIdentityRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/verification/v1/verifications/${data['method']}/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<VerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'VerificationStatusByIdentity',
    });
  }

  /**
   * Get verification by Reference
   * Queries the verification result by sending the verification Reference. With this query you can get the result of a verification.
   * @param { VerificationStatusByReferenceRequestData } data - The data to provide to the API call.
   */
  public async getByReference(data: VerificationStatusByReferenceRequestData): Promise<VerificationReportResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<VerificationStatusByReferenceRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const path = `/verification/v1/verifications/reference/${data['reference']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<VerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'VerificationStatusByReference',
    });
  }

}
