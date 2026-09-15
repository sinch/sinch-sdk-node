import { RequestBody } from '@sinch/sdk-client';
import {
  BatchDetails,
  BatchResponse,
  BatchStopResponse,
  BatchSummary,
  GetBatchCallSummaryRequestData,
  GetBatchDetailsRequestData,
  StartBatchRequestData,
  StopBatchProcessingRequestData,
} from '../../../models/v2';
import { VoiceV2DomainApi } from '../voice-v2-domain-api';
import { LazyVoiceV2ApiClient } from '../voice-v2-service';

export class BatchesApi extends VoiceV2DomainApi {

  /** @internal */
  constructor(lazyClient: LazyVoiceV2ApiClient) {
    super(lazyClient, 'BatchesApi');
  }

  /**
   * Create and initiate a batch of outbound call sessions
   * Create a batch of outbound call sessions associated to the project's default service or to the
   * service specified in the `serviceId` query parameter. Uses the same HTTP operation as
   * `voice.v2.calls.start` (`POST /v2/projects/{projectId}/calls`). Logged as `createBatch`
   * to distinguish it from single-call `createCall`.
   * @param { StartBatchRequestData } data - The data to provide to the API call.
   */
  public async start(data: StartBatchRequestData): Promise<BatchResponse> {
    const getParams = this.client.extractQueryParams<StartBatchRequestData>(data, ['serviceId']);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Idempotency-Key': data['Idempotency-Key'],
    };

    const body: RequestBody = data['startBatchRequestBody']
      ? JSON.stringify(data['startBatchRequestBody'])
      : '{}';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/calls`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'POST', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<BatchResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'createBatch',
    });
  }

  /**
   * Get a batch summary
   * Retrieve a summary of a batch call operation, including statistics on completed, failed, in-progress, and queued calls. This provides an overview of the batch execution state and individual call session states.
   * @param { GetBatchCallSummaryRequestData } data - The data to provide to the API call.
   */
  public async get(data: GetBatchCallSummaryRequestData): Promise<BatchSummary> {
    const getParams = this.client.extractQueryParams<GetBatchCallSummaryRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/batches/${data['batchId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<BatchSummary>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getBatchCallSummary',
    });
  }

  /**
   * Get batch details
   * Retrieve per-session details for a batch call operation, including the current state of each call session in the batch. Use this endpoint when individual session-level visibility is needed (for example, to inspect which sessions are `QUEUED`, `IN_PROGRESS` or `COMPLETED`). `EXPIRED` sessions are never returned because they were never initiated.
   * @param { GetBatchDetailsRequestData } data - The data to provide to the API call.
   */
  public async getDetails(data: GetBatchDetailsRequestData): Promise<BatchDetails> {
    const getParams = this.client.extractQueryParams<GetBatchDetailsRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/batches/${data['batchId']}/details`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'GET', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<BatchDetails>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'getBatchDetails',
    });
  }

  /**
   * Stop processing a batch of call sessions
   * Stop processing a batch of call sessions. This will prevent any queued calls in the batch from being initiated. Calls that are already in progress will not be affected and will continue until completion.
   * Returns HTTP 202 with `{ result: 'STOP_REQUESTED' }` when the cancellation request is accepted; it does not delete the batch or hang up in-progress calls.
   * @param { StopBatchProcessingRequestData } data - The data to provide to the API call.
   */
  public async stop(data: StopBatchProcessingRequestData): Promise<BatchStopResponse> {
    const getParams = this.client.extractQueryParams<StopBatchProcessingRequestData>(data, [] as never[]);
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const body: RequestBody = '';
    const basePathUrl
      = `${this.client.apiClientOptions.hostname}/v2/projects/${this.client.apiClientOptions.projectId}/batches/${data['batchId']}`;

    const requestOptions
      = await this.client.prepareOptions(basePathUrl, 'DELETE', getParams, headers, body || undefined);
    const url = this.client.prepareUrl(requestOptions.hostname, requestOptions.queryParams);

    return this.client.processCall<BatchStopResponse>({
      url,
      requestOptions,
      apiName: this.apiName,
      operationId: 'stopBatchProcessing',
    });
  }

}
