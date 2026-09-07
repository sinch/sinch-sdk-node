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
