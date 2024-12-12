import {
  GenericResponseFromApi,
  GetStoredEmailResponse,
  GetStoredEmailResponseFromApi,
  SendEmailRequest,
  SendEmailResponse,
  SendEmailResponseFromApi,
  SendingQueuesStatusResponse,
  SendingQueuesStatusResponseFromApi,
  SendMimeEmailRequest,
  transformGetEmailResponseIntoClientResponse,
  transformSendEmailRequestIntoApiRequestBody,
  transformSendEmailResponseIntoClientResponse,
  transformSendingQueuesStatusResponseIntoClientResponse,
  transformSendMimeEmailRequestIntoApiRequestBody,
} from '../../../models';
import {
  RequestBody,
  SinchClientParameters,
  MailgunStorageHostname,
} from '@sinch/sdk-client';
import { MailgunDomainApi } from '../mailgun-domain-api';

export class EmailsApi extends MailgunDomainApi {
  storageHostnames: string[];

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'EmailsApi');
    this.storageHostnames = [];
  }

  /**
   * Send an email
   * Pass the components of the messages such as To, From, Subject, HTML and text parts, attachments, etc. Mailgun will build a MIME representation of the message and send it. Note: In order to send you must provide one of the following parameters: 'text', 'html', 'amp-html' or 'template'
   * @param { string } domainName - Domain name used to send the message
   * @param { SendEmailRequest } request - The data to provide to the API call.
   */
  public async sendEmail(domainName: string, request: SendEmailRequest): Promise<SendEmailResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<SendEmailRequest>(request, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; charset=utf-8',
    };
    const body: RequestBody = transformSendEmailRequestIntoApiRequestBody(request);
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/${domainName}/messages`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    const apiResponse = await  this.client.processCall<SendEmailResponseFromApi>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'sendEmail',
    });

    return transformSendEmailResponseIntoClientResponse(apiResponse);
  }

  /**
   * Send an email in MIME format
   * Build a MIME string yourself using a MIME library for your programming language and submit it to Mailgun.
   * @param { string } domainName - Domain name used to send the message
   * @param { SendMimeEmailRequest } request - The data to provide to the API call.
   */
  public async sendMimeEmail(domainName: string, request: SendMimeEmailRequest): Promise<SendEmailResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<SendMimeEmailRequest>(request, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      Accept: 'application/json',
    };
    const body: RequestBody = transformSendMimeEmailRequestIntoApiRequestBody(request);
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/${domainName}/messages.mime`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    const apiResponse = await this.client.processCall<SendEmailResponseFromApi>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'sendMimeEmail',
    });

    return transformSendEmailResponseIntoClientResponse(apiResponse);
  }

  /**
   * Retrieve a stored email
   * Event(s) created from sending an email with Mailgun will contain a `storage.key` to use to retrieve the email.
   * @param { string } domainName - Domain name that was used to send the email
   * @param { string } storageKey - Storage key from the emails associated events
   */
  public async getStoredEmail(domainName: string, storageKey: string): Promise<GetStoredEmailResponse> {
    this.client = this.getSinchClient();
    const getParams = {};
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/domains/${domainName}/messages/${storageKey}`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    const apiResponse = await this.client.processCall<GetStoredEmailResponseFromApi>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getEmail',
    });

    return transformGetEmailResponseIntoClientResponse(apiResponse);
  }

  /**
   * Delete scheduled and undelivered mail
   * Deletes all scheduled and undelivered mail from the domain queue.  This endpoint must be called on the storage API host and in the domain's region.  e.g. https://storage-us-east4.api.mailgun.net/v3/example.com/envelopes
   *
   * The storage hosts are `storage-us-east4.api.mailgun.net`, `storage-us-west1.api.mailgun.net`, and `storage-europe-west1.api.mailgun.net`.
   * @param { string } domainName - The name of the domain you want to delete envelope from
   * @param { MailgunStorageHostname } storageHostname - The storage hostname to be purged
   */
  public async purgeSendingQueue(
    domainName: string,
    storageHostname: MailgunStorageHostname,
  ): Promise<Record<string, never>> {
    this.client = this.getSinchClient();
    const getParams = {};
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body: RequestBody = '';
    const basePathUrl = `${storageHostname}/v3/${domainName}/envelopes`;

    const requestOptions = await this.client.prepareOptions(
      basePathUrl,
      'DELETE',
      getParams,
      headers,
      body || undefined,
    );
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    await this.client.processCall<GenericResponseFromApi>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'purgeSendingQueue',
    });

    return {};
  }

  /**
   * Get messages queue status
   * Provides default and scheduled message queue information.
   * @param { string } name - The name of the domain you want get sending queues from
   */
  public async getSendingQueuesStatus(name: string): Promise<SendingQueuesStatusResponse> {
    this.client = this.getSinchClient();
    const getParams = {};
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/v3/domains/${name}/sending_queues`;

    const requestOptions = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    const apiResponse = await this.client.processCall<SendingQueuesStatusResponseFromApi>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getSendingQueuesStatus',
    });

    return transformSendingQueuesStatusResponseIntoClientResponse(apiResponse);
  }

}
