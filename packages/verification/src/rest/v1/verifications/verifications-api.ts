import {
  InitiateVerificationResource,
  InitiateVerificationResponse,
  VerificationReportRequest,
  VerificationResponse,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VerificationApi } from '../verification-api';

export interface ReportVerificationByIdRequestData {
  /** The ID of the verification. */
  'id': string;
  /**  */
  'verificationReportRequestBody': VerificationReportRequest;
}
export interface ReportVerificationByIdentityRequestData {
  /** For type `number` use a [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537)-compatible phone number. */
  'endpoint': string;
  /**  */
  'verificationReportRequestBody': VerificationReportRequest;
}
export interface StartVerificationRequestData {
  /**  */
  'initiateVerificationRequestBody': InitiateVerificationResource;
}

export class VerificationsApi extends VerificationApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'VerificationsApi');
  }

  /**
   * Report a verification with ID
   * Report the received verification code to verify it, using the Verification ID of the Verification request.
   * @param { ReportVerificationByIdRequestData } data - The data to provide to the API call.
   */
  public async reportById(data: ReportVerificationByIdRequestData): Promise<VerificationResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ReportVerificationByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['verificationReportRequestBody'] ? JSON.stringify(data['verificationReportRequestBody']) : '{}';
    const path = `/verification/v1/verifications/id/${data['id']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<VerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportVerificationById',
    });
  }

  /**
   * Report a verification using Identity
   * Report the received verification code to verify it, using the identity of the user (in most cases, the phone number). For an SMS PIN verification or Phone Call verification, this is the OTP code. For flashcalls, this is the CLI.
   * @param { ReportVerificationByIdentityRequestData } data - The data to provide to the API call.
   */
  public async reportByIdentity(data: ReportVerificationByIdentityRequestData): Promise<VerificationResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ReportVerificationByIdentityRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['verificationReportRequestBody'] ? JSON.stringify(data['verificationReportRequestBody']) : '{}';
    const path = `/verification/v1/verifications/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<VerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportVerificationByIdentity',
    });
  }

  /**
   * Start verification
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartVerificationRequestData } data - The data to provide to the API call.
   */
  public async start(data: StartVerificationRequestData): Promise<InitiateVerificationResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<StartVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['initiateVerificationRequestBody'] ? JSON.stringify(data['initiateVerificationRequestBody']) : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<InitiateVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerification',
    });
  }

}
