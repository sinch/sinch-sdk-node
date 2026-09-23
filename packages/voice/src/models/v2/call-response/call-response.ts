/**
 * Response returned after initiating a single outbound call.
 *
 * Contains identifiers for the created session and associated project/service.
 */
export interface CallResponse {
  /** The Id of the project associated with the call. */
  projectId: string;
  /** The ID of the service used. */
  serviceId: string;
  /** The ID of the session. */
  sessionId: string;
}
