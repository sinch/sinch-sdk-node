import {
  StartCalloutVerificationResponse,
  CalloutVerificationReportResponse,
  StartSeamlessVerificationResponse,
  StartFlashCallVerificationResponse,
  FlashCallVerificationReportResponse,
  StartSmsVerificationResponse,
  SMSVerificationReportResponse,
  ReportSmsVerificationByIdRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportCalloutVerificationByIdRequestData,
  ReportSmsVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdentityRequestData,
  StartSmsVerificationRequestData,
  StartFlashCallVerificationRequestData,
  StartCalloutVerificationRequestData,
  StartSeamlessVerificationRequestData,
  StartVerificationWithSms,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
} from '@sinch/sdk-client';
import { VerificationDomainApi } from '../verification-domain-api';

export class VerificationsApi extends VerificationDomainApi {

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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

    // Special fields handling: see method for details
    const requestDataBody = this.performStartSmsRequestBodyTransformation(data.startVerificationWithSmsRequestBody);

    const body: RequestBody = requestDataBody
      ? JSON.stringify(requestDataBody)
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<StartSmsVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerificationWithSms',
    });
  }

  performStartSmsRequestBodyTransformation(body: StartVerificationWithSms): StartVerificationWithSms {
    const requestDataBody = { ...body };
    if (requestDataBody.smsOptions?.expiry !== undefined) {
      const expiry = requestDataBody.smsOptions?.expiry;
      if (expiry instanceof Date) {
        requestDataBody.smsOptions.expiry = this.formatTime(expiry);
      }
    }

    return requestDataBody;
  }

  formatTime(date: Date): string {
    // Assume the hours needs to be set at the UTC time + Pad single-digit components with leading zeros
    const formattedHours = String(date.getUTCHours()).padStart(2, '0');
    const formattedMinutes = String(date.getUTCMinutes()).padStart(2, '0');
    const formattedSeconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Concatenate the components with colons to form the formatted time string
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

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
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<StartSeamlessVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartSeamlessVerification',
    });
  }

}
