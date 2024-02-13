import {
  StartCalloutVerificationResponse, CalloutVerificationReportRequest, CalloutVerificationReportResponse,
  StartSeamlessVerificationResponse,
  StartFlashCallVerificationResponse, FlashCallVerificationReportRequest, FlashCallVerificationReportResponse,
  StartSmsVerificationResponse, SmsVerificationReportRequest, SMSVerificationReportResponse,
  StartSeamlessVerification,
  StartVerificationWithCallout,
  StartVerificationWithFlashCall,
  StartVerificationWithSms,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VerificationApi } from '../verification-api';

interface ReportVerificationByIdRequestDataBase {
  /** The ID of the verification. */
  'id': string;
}

export interface ReportSmsVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with an SMS by its ID */
  'reportSmsVerificationByIdRequestBody': SmsVerificationReportRequest;
}

export interface ReportFlashCallVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with a flashCall by its ID */
  'reportFlashCallVerificationByIdRequestBody': FlashCallVerificationReportRequest;
}

export interface ReportCalloutVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with a callout by its ID */
  'reportCalloutVerificationByIdRequestBody': CalloutVerificationReportRequest;
}

interface ReportVerificationByIdentityRequestDataBase {
  /** For type `number` use a [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537)-compatible phone number. */
  'endpoint': string;
}

export interface ReportSmsVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with an SMS by its identity */
  'reportSmsVerificationByIdentityRequestBody': SmsVerificationReportRequest;
}

export interface ReportFlashCallVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with a flashCall by its identity */
  'reportFlashCallVerificationByIdentityRequestBody': FlashCallVerificationReportRequest;
}

export interface ReportCalloutVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with a callout by its identity */
  'reportCalloutVerificationByIdentityRequestBody': CalloutVerificationReportRequest;
}

export interface StartSmsVerificationRequestData {
  /** Request body to start a verification with an SMS */
  'startVerificationWithSmsRequestBody': StartVerificationWithSms;
}

export interface StartFlashCallVerificationRequestData {
  /** Request body to start a verification with a flashCall */
  'startVerificationWithFlashCallRequestBody': StartVerificationWithFlashCall;
}

export interface StartCalloutVerificationRequestData {
  /** Request body to start a verification with a callout */
  'startVerificationWithCalloutRequestBody': StartVerificationWithCallout;
}

export interface StartSeamlessVerificationRequestData {
  /** Request body to start a seamless verification */
  'startSeamlessVerificationRequestBody': StartSeamlessVerification;
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
   * Report an SMS verification with ID
   * Report the received verification code to verify it, using the Verification ID of the Verification request.
   * @param { ReportSmsVerificationByIdRequestData } data - The data to provide to the API call.
   */
  public async reportSmsById(data: ReportSmsVerificationByIdRequestData): Promise<SMSVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportSmsVerificationByIdRequestBody as any).method = 'sms';
    const getParams = this.client.extractQueryParams<ReportSmsVerificationByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportSmsVerificationByIdRequestBody']
      ? JSON.stringify(data['reportSmsVerificationByIdRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/id/${data['id']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<SMSVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportSmsVerificationById',
    });
  }

  /**
   * Report a FlashCall verification with ID
   * Report the received verification code to verify it, using the Verification ID of the Verification request.
   * @param { ReportFlashCallVerificationByIdRequestData } data - The data to provide to the API call.
   */
  public async reportFlashCallById(
    data: ReportFlashCallVerificationByIdRequestData,
  ): Promise<FlashCallVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportFlashCallVerificationByIdRequestBody as any).method = 'flashCall';
    const getParams = this.client.extractQueryParams<ReportFlashCallVerificationByIdRequestData>(
      data,
      [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportFlashCallVerificationByIdRequestBody']
      ? JSON.stringify(data['reportFlashCallVerificationByIdRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/id/${data['id']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<FlashCallVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportFlashCallVerificationById',
    });
  }

  /**
   * Report a Callout verification with ID
   * Report the received verification code to verify it, using the Verification ID of the Verification request.
   * @param { ReportCalloutVerificationByIdRequestData } data - The data to provide to the API call.
   */
  public async reportCalloutById(
    data: ReportCalloutVerificationByIdRequestData,
  ): Promise<CalloutVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportCalloutVerificationByIdRequestBody as any).method = 'callout';
    const getParams = this.client.extractQueryParams<ReportCalloutVerificationByIdRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportCalloutVerificationByIdRequestBody']
      ? JSON.stringify(data['reportCalloutVerificationByIdRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/id/${data['id']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CalloutVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportCalloutVerificationById',
    });
  }

  /**
   * Report an SMS verification using Identity
   * Report the received verification code (OTP) to verify it, using the identity of the user (in most cases, the phone number).
   * @param { ReportSmsVerificationByIdentityRequestData } data - The data to provide to the API call.
   */
  public async reportSmsByIdentity(
    data: ReportSmsVerificationByIdentityRequestData,
  ): Promise<SMSVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportSmsVerificationByIdentityRequestBody as any).method = 'sms';
    const getParams = this.client.extractQueryParams<ReportSmsVerificationByIdentityRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportSmsVerificationByIdentityRequestBody']
      ? JSON.stringify(data['reportSmsVerificationByIdentityRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<SMSVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportSmsVerificationByIdentity',
    });
  }

  /**
   * Report a FlashCall verification using Identity
   * Report the received verification code (CLI) to verify it, using the identity of the user (in most cases, the phone number).
   * @param { ReportFlashCallVerificationByIdentityRequestData } data - The data to provide to the API call.
   */
  public async reportFlashCallByIdentity(
    data: ReportFlashCallVerificationByIdentityRequestData,
  ): Promise<FlashCallVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportFlashCallVerificationByIdentityRequestBody as any).method = 'flashCall';
    const getParams = this.client.extractQueryParams<ReportFlashCallVerificationByIdentityRequestData>(
      data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportFlashCallVerificationByIdentityRequestBody']
      ? JSON.stringify(data['reportFlashCallVerificationByIdentityRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<FlashCallVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportFlashCallVerificationByIdentity',
    });
  }

  /**
   * Report a Callout verification using Identity
   * Report the received verification code (OTP) to verify it, using the identity of the user (in most cases, the phone number).
   * @param { ReportCalloutVerificationByIdentityRequestData } data - The data to provide to the API call.
   */
  public async reportCalloutByIdentity(
    data: ReportCalloutVerificationByIdentityRequestData,
  ): Promise<CalloutVerificationReportResponse> {
    this.client = this.getSinchClient();
    (data.reportCalloutVerificationByIdentityRequestBody as any).method = 'callout';
    const getParams = this.client.extractQueryParams<ReportCalloutVerificationByIdentityRequestData>(
      data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['reportCalloutVerificationByIdentityRequestBody']
      ? JSON.stringify(data['reportCalloutVerificationByIdentityRequestBody'])
      : '{}';
    const path = `/verification/v1/verifications/number/${data['endpoint']}`;
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<CalloutVerificationReportResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReportCalloutVerificationByIdentity',
    });
  }

  /**
   * Start verification with SMS
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartSmsVerificationRequestData } data - The data to provide to the API call.
   */
  public async startSms(data: StartSmsVerificationRequestData): Promise<StartSmsVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startVerificationWithSmsRequestBody as any).method = 'sms';
    const getParams = this.client.extractQueryParams<StartSmsVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['startVerificationWithSmsRequestBody']
      ? JSON.stringify(data['startVerificationWithSmsRequestBody'])
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<StartSmsVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerificationWithSms',
    });
  }

  /**
   * Start verification with a FlashCall
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartFlashCallVerificationRequestData } data - The data to provide to the API call.
   */
  public async startFlashCall(
    data: StartFlashCallVerificationRequestData,
  ): Promise<StartFlashCallVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startVerificationWithFlashCallRequestBody as any).method = 'flashCall';
    const getParams = this.client.extractQueryParams<StartFlashCallVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['startVerificationWithFlashCallRequestBody']
      ? JSON.stringify(data['startVerificationWithFlashCallRequestBody'])
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<StartFlashCallVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerificationWithFlashCall',
    });
  }

  /**
   * Start verification with a callout
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartCalloutVerificationRequestData } data - The data to provide to the API call.
   */
  public async startCallout(data: StartCalloutVerificationRequestData): Promise<StartCalloutVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startVerificationWithCalloutRequestBody as any).method = 'callout';
    const getParams = this.client.extractQueryParams<StartCalloutVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['startVerificationWithCalloutRequestBody']
      ? JSON.stringify(data['startVerificationWithCalloutRequestBody'])
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<StartCalloutVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerificationWithCallout',
    });
  }

  /**
   * Start seamless verification (= data verification)
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartSeamlessVerificationRequestData } data - The data to provide to the API call.
   */
  public async startSeamless(data: StartSeamlessVerificationRequestData): Promise<StartSeamlessVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startSeamlessVerificationRequestBody as any).method = 'seamless';
    const getParams = this.client.extractQueryParams<StartSeamlessVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['startSeamlessVerificationRequestBody']
      ? JSON.stringify(data['startSeamlessVerificationRequestBody'])
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.basePath + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.basePath, requestOptions.queryParams);

    return this.client.processCall<StartSeamlessVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartSeamlessVerification',
    });
  }

}
