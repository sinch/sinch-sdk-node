import { VerificationDomainApi } from '../verification-domain-api';
import { RequestBody, SinchClientParameters } from '@sinch/sdk-client';
import {
  StartDataVerificationRequestData,
  StartDataVerificationResponse,
  StartFlashCallVerificationRequestData,
  StartFlashCallVerificationResponse,
  StartPhoneCallVerificationRequestData,
  StartPhoneCallVerificationResponse,
  StartSmsVerificationRequestData,
  StartSmsVerificationResponse,
  StartVerificationWithPhoneCall,
  StartVerificationWithSms,
} from '../../../models';

export class StartVerificationsApi extends VerificationDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'VerificationsApi');
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
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (data.startVerificationWithSmsRequestBody.smsOptions?.locale !== undefined) {
      headers['Accept-Language'] = data.startVerificationWithSmsRequestBody.smsOptions.locale;
    }

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
    // Remove the `locale` property from the body as it is used as a header parameter for the API call
    delete requestDataBody.smsOptions?.locale;

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
    (data.startVerificationWithFlashCallRequestBody as any).method = 'flashcall';
    const getParams = this.client.extractQueryParams<StartFlashCallVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
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
   * Start verification with a phone call
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartPhoneCallVerificationRequestData } data - The data to provide to the API call.
   */
  public async startPhoneCall(
    data: StartPhoneCallVerificationRequestData,
  ): Promise<StartPhoneCallVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startVerificationWithPhoneCallRequestBody as any).method = 'callout';
    const getParams = this.client.extractQueryParams<StartPhoneCallVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Special fields handling: see method for details
    const requestDataBody = this.performStartPhoneCallRequestBodyTransformation(
      data.startVerificationWithPhoneCallRequestBody);

    const body: RequestBody = requestDataBody
      ? JSON.stringify(requestDataBody)
      : '{}';

    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<StartPhoneCallVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartVerificationWithPhoneCall',
    });
  }

  performStartPhoneCallRequestBodyTransformation(body: StartVerificationWithPhoneCall): StartVerificationWithPhoneCall {
    const requestDataBody = { ...body };
    if (requestDataBody.phoneCallOptions !== undefined) {
      (requestDataBody as any).calloutOptions = { ...requestDataBody.phoneCallOptions };
      delete requestDataBody.phoneCallOptions;
    }
    return requestDataBody;
  }

  /**
   * Start data verification
   * This method is used by the mobile and web Verification SDKs to start a verification. It can also be used to request a verification from your backend, by making a request.
   * @param { StartDataVerificationRequestData } data - The data to provide to the API call.
   */
  public async startData(data: StartDataVerificationRequestData): Promise<StartDataVerificationResponse> {
    this.client = this.getSinchClient();
    (data.startDataVerificationRequestBody as any).method = 'seamless';
    const getParams = this.client.extractQueryParams<StartDataVerificationRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['startDataVerificationRequestBody']
      ? JSON.stringify(data['startDataVerificationRequestBody'])
      : '{}';
    const path = '/verification/v1/verifications';
    const basePathUrl = this.client.apiClientOptions.hostname + path;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined, path);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<StartDataVerificationResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'StartDataVerification',
    });
  }

}
