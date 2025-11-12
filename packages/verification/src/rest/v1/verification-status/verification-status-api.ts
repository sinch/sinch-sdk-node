import { RequestBody } from '@sinch/sdk-client';
import {
  VerificationStatusResponse,
  VerificationStatusByIdentityRequestData,
  VerificationStatusByIdRequestData,
  VerificationStatusByReferenceRequestData,
} from '../../../models';
import { VerificationDomainApi } from '../verification-domain-api';
import { LazyVerificationApiClient } from '../verification-service';

export class VerificationStatusApi extends VerificationDomainApi {

  constructor(lazyClient: LazyVerificationApiClient) {
    super(lazyClient,  'VerificationStatusApi');
  }

  /**
   * Get verification by ID
   * Queries the verification result by sending the verification ID. With this query you can get the result of a verification.
   * @param { VerificationStatusByIdRequestData } data - The data to provide to the API call.
   */
  public async getById(data: VerificationStatusByIdRequestData): Promise<VerificationStatusResponse> {
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

    return this.client.processCall<VerificationStatusResponse>({
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
  public async getByIdentity(data: VerificationStatusByIdentityRequestData): Promise<VerificationStatusResponse> {
    const getParams = this.client.extractQueryParams<VerificationStatusByIdentityRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    let verificationMethod = data['method'];
    if (verificationMethod === 'phonecall') {
      verificationMethod = 'callout';
    }

    const body: RequestBody = '';
    const path = `/verification/v1/verifications/${verificationMethod}/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<VerificationStatusResponse>({
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
  public async getByReference(data: VerificationStatusByReferenceRequestData): Promise<VerificationStatusResponse> {
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

    return this.client.processCall<VerificationStatusResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'VerificationStatusByReference',
    });
  }

}
