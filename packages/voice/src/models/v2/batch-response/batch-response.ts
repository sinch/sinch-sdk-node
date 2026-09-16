/**
 * Response returned after initiating a batch of outbound call sessions.
 */
export interface BatchResponse {
  /** The Id of the project associated with the batch. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** The ID of the batch. */
  batchId: string;
}
