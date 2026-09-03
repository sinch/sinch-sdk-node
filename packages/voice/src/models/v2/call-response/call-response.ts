/**
 * Response returned after initiating an outbound call or a batch of call sessions.
 *
 * Contains identifiers for the created session and associated project/service.
 * `sessionId` is present for a single-call response. `batchId` is included only when the request started a batch operation.
 */
export interface CallResponse {
  /** The Id of the project associated with the call. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** The ID of the session. Present for a single-call response; omitted for batch create responses. */
  sessionId?: string;
  /** The ID of the batch. Present only when the request started a batch operation. */
  batchId?: string;
}
