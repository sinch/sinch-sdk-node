/**
 * Response returned after initiating an outbound call or a batch of call sessions.
 *
 * Contains identifiers for the created session and associated project/service. `batchId` is included only when the request started a batch operation.
 */
export interface CallResponse {
  /** The Id of the project associated with the call. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** The ID of the session. */
  sessionId: string;
  /** The ID of the batch. Present only when the request started a batch operation. */
  batchId?: string;
}
