import {
  CancelBatchMessageResponse,
  DryRunResponse,
  ReplaceBatchMessageResponse,
  SendSMSResponse,
  BinaryResponse,
  TextResponse,
  MediaResponse,
  CancelBatchMessageRequestData,
  DeliveryFeedbackRequestData,
  DryRunRequestData,
  GetBatchMessageRequestData,
  ListBatchesRequestData,
  ReplaceBatchMessageRequestData,
  SendSMSRequestData,
  SendTextSMSRequestData, SendBinarySMSRequestData, SendMediaSMSRequestData, UpdateBatchMessageRequestData,
} from '../../../models';
import {
  RequestBody,
  ApiListPromise,
  PaginatedApiProperties,
  PaginationEnum,
  SinchClientParameters,
  buildPageResultPromise,
  createIteratorMethodsForPagination,
} from '@sinch/sdk-client';
import { SmsDomainApi } from '../sms-domain-api';

export class BatchesApi extends SmsDomainApi {

  /**
   * Initialize your interface
   *
   * @param {SinchClientParameters} sinchClientParameters - The parameters used to initialize the API Client.
   */
  constructor(sinchClientParameters: SinchClientParameters) {
    super(sinchClientParameters, 'BatchesApi');
  }

  /**
   * Cancel a batch message
   * A batch can be canceled at any point. If a batch is canceled while it's currently being delivered some messages currently being processed might still be delivered. The delivery report will indicate which messages were canceled and which weren't.  Canceling a batch scheduled in the future will result in an empty delivery report while canceling an already sent batch would result in no change to the completed delivery report.
   * @param { CancelBatchMessageRequestData } data - The data to provide to the API call.
   */
  public async cancel(data: CancelBatchMessageRequestData): Promise<CancelBatchMessageResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<CancelBatchMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<CancelBatchMessageResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'CancelBatchMessage',
    });
  }

  /**
   * Send delivery feedback for a message
   * Send feedback if your system can confirm successful message delivery.   Feedback can only be provided if 'feedback_enabled' was set when batch was submitted.
   * **Batches**: It is possible to submit feedback multiple times for the same batch for different recipients. Feedback without specified recipients is treated as successful message delivery to all recipients referenced in the batch. Note that the 'recipients' key is still required even if the value is empty.
   * **Groups**: If the batch message was creating using a group ID, at least one recipient is required. Excluding recipients (an empty recipient list) does not work and will result in a failed request.
   * @param { DeliveryFeedbackRequestData } data - The data to provide to the API call.
   */
  public async sendDeliveryFeedback(data: DeliveryFeedbackRequestData): Promise<void> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DeliveryFeedbackRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['deliveryFeedbackRequestBody'] ? JSON.stringify(data['deliveryFeedbackRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}/delivery_feedback`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<void>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'DeliveryFeedback',
    });
  }

  /**
   * Dry run
   * This operation will perform a dry run of a batch which calculates the bodies and number of parts for all messages in the batch without actually sending any messages.
   * @param { DryRunRequestData } data - The data to provide to the API call.
   */
  public async dryRun(data: DryRunRequestData): Promise<DryRunResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<DryRunRequestData>(data, [
      'per_recipient',
      'number_of_recipients']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['dryRunRequestBody'] ? JSON.stringify(data['dryRunRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/dry_run`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<DryRunResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'Run',
    });
  }

  /**
   * Get a batch message
   * This operation returns a specific batch that matches the provided batch ID.
   * @param { GetBatchMessageRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetBatchMessageRequestData): Promise<SendSMSResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<GetBatchMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SendSMSResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'GetBatchMessage',
    });
  }

  /**
   * List Batches
   * With the list operation you can list batch messages created in the last 14 days that you have created. This operation supports pagination.
   * @param { ListBatchesRequestData } data - The data to provide to the API call.
   * @return {ApiListPromise<SendSMSResponse>}
  */
  public list(data: ListBatchesRequestData): ApiListPromise<SendSMSResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ListBatchesRequestData>(
      data,
      ['page', 'page_size', 'from', 'start_date', 'end_date', 'client_reference'],
    );
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches`;

    const requestOptionsPromise
      = this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);

    const operationProperties: PaginatedApiProperties = {
      pagination: PaginationEnum.PAGE,
      apiName: this.apiName,
      operationId: 'ListBatches',
      dataKey: 'batches',
    };

    // Create the promise containing the response wrapped as a PageResult
    const listPromise = buildPageResultPromise<SendSMSResponse>(
      this.client,
      requestOptionsPromise,
      operationProperties);

    // Add properties to the Promise to offer the possibility to use it as an iterator
    Object.assign(
      listPromise,
      createIteratorMethodsForPagination<SendSMSResponse>(
        this.client, requestOptionsPromise, listPromise, operationProperties),
    );

    return listPromise as ApiListPromise<SendSMSResponse>;
  }

  /**
   * Replace a batch
   * This operation will replace all the parameters of a batch with the provided values. It is the same as cancelling a batch and sending a new one instead.
   * @param { ReplaceBatchMessageRequestData } data - The data to provide to the API call.
   */
  public async replace(data: ReplaceBatchMessageRequestData): Promise<ReplaceBatchMessageResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<ReplaceBatchMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['replaceBatchMessageRequestBody'] ? JSON.stringify(data['replaceBatchMessageRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'PUT', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<ReplaceBatchMessageResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'ReplaceBatch',
    });
  }

  /**
   * Send Text Message
   * Send a text message or a batch of text messages.
   * Depending on the length of the body, one message might be split into multiple parts and charged accordingly.
   * Any groups targeted in a scheduled batch will be evaluated at the time of sending.
   * If a group is deleted between batch creation and scheduled date, it will be considered empty.
   * Be sure to use the correct region in the server URL.
   * @param { SendSMSRequestData } data - The data to provide to the API call.
   */
  public async send(data: SendSMSRequestData): Promise<SendSMSResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<SendSMSRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = data['sendSMSRequestBody'] ? JSON.stringify(data['sendSMSRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SendSMSResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'SendSMS',
    });
  }

  /**
   * Send Text Message
   * Send a text message or a batch of text messages.
   * Depending on the length of the body, one message might be split into multiple parts and charged accordingly.
   * Any groups targeted in a scheduled batch will be evaluated at the time of sending.
   * If a group is deleted between batch creation and scheduled date, it will be considered empty.
   * Be sure to use the correct region in the server URL.
   * @param { SendTextSMSRequestData } data - The data to provide to the API call.
   */
  public async sendTextMessage(data: SendTextSMSRequestData): Promise<TextResponse> {
    const response = await this.send(data);
    return response as TextResponse;
  }

  /**
   * Send Binary Message
   * Send a binary message or a batch of binary messages.
   * Depending on the length of the body, one message might be split into multiple parts and charged accordingly.
   * Any groups targeted in a scheduled batch will be evaluated at the time of sending.
   * If a group is deleted between batch creation and scheduled date, it will be considered empty.
   * Be sure to use the correct region in the server URL.
   * @param { SendBinarySMSRequestData } data - The data to provide to the API call.
   */
  public async sendBinaryMessage(data: SendBinarySMSRequestData): Promise<BinaryResponse> {
    const response = await this.send(data);
    return response as BinaryResponse;
  }

  /**
   * Send Media Message
   * Send a media message or a batch of media messages.
   * Depending on the length of the body, one message might be split into multiple parts and charged accordingly.
   * Any groups targeted in a scheduled batch will be evaluated at the time of sending.
   * If a group is deleted between batch creation and scheduled date, it will be considered empty.
   * Be sure to use the correct region in the server URL.
   * @param { SendMediaSMSRequestData } data - The data to provide to the API call.
   */
  public async sendMediaMessage(data: SendMediaSMSRequestData): Promise<MediaResponse> {
    const response = await this.send(data);
    return response as MediaResponse;
  }

  /**
   * Update a Batch message
   * This operation updates all specified parameters of a batch that matches the provided batch ID.
   * @param { UpdateBatchMessageRequestData } data - The data to provide to the API call.
   */
  public async update(data: UpdateBatchMessageRequestData): Promise<SendSMSResponse> {
    this.client = this.getSinchClient();
    const getParams = this.client.extractQueryParams<UpdateBatchMessageRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody
      = data['updateBatchMessageRequestBody'] ? JSON.stringify(data['updateBatchMessageRequestBody']) : '{}';
    const basePathUrl = `${this.client.apiClientOptions.hostname}/xms/v1/${this.client.apiClientOptions.projectId}/batches/${data['batch_id']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<SendSMSResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'UpdateBatchMessage',
    });
  }

}
