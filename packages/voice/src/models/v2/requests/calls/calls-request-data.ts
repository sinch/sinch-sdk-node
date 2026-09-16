import { CallRequest } from '../../call-request';

export interface CreateCallRequestData {
  /** The ID of the service. If omitted, the project's default service is used. */
  'serviceId'?: string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. */
  'Idempotency-Key'?: string;
  /** Request payload to initiate a single outbound call. */
  'createCallRequestBody'?: CallRequest;
}
