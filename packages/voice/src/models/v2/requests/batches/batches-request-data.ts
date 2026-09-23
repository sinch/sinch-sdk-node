import { BatchRequest } from '../../batch-request';

export interface StartBatchRequestData {
  /** The ID of the service. If omitted, the project's default service is used. */
  'serviceId'?: string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. */
  'Idempotency-Key'?: string;
  /** Request payload to initiate a batch of outbound call sessions. */
  'startBatchRequestBody'?: BatchRequest;
}

export interface GetBatchCallSummaryRequestData {
  /** Unique identifier of the batch call operation (ULID). */
  'batchId': string;
}

export interface GetBatchDetailsRequestData {
  /** Unique identifier of the batch call operation (ULID). */
  'batchId': string;
}

export interface StopBatchProcessingRequestData {
  /** Unique identifier of the batch call operation (ULID). */
  'batchId': string;
}
