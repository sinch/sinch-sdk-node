import { CallPatchRequest } from '../../call-patch-request';
import { CallReason, CallResult, CallType } from '../../call';
import { CallRequest } from '../../call-request';

export interface CreateCallRequestData {
  /** The ID of the service. If omitted, the project's default service is used. */
  'serviceId'?: string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. */
  'Idempotency-Key'?: string;
  /** Request payload to initiate a single outbound call. */
  'createCallRequestBody'?: CallRequest;
}

export interface ListCallsRequestData {
  /** The ID of the service. */
  'serviceId'?: string;
  /**
   * Only include calls where `from` matches this origin. For inbound
   * calls, this is the caller; for outbound calls, this is the calling
   * party.
   */
  'from'?: string;
  /**
   * Only include calls where `to` matches this destination. For inbound
   * calls, this is the called party; for outbound calls, this is the
   * callee/recipient.
   */
  'to'?: string;
  /**
   * Only include calls of the specified type.
   *
   * If omitted, calls of all types are included.
   */
  'callType'?: CallType;
  /**
   * Only include calls that started **at or after** `startTime`.
   *
   * Use a more precise timestamp to narrow the results. For example:
   * - `2025-02-01` matches calls starting from 2025-02-01T00:00:00Z
   * - `2025-02-01T14:00:00Z` matches calls starting from 14:00:00Z on 2025-02-01
   */
  'startTime'?: Date;
  /**
   * Only include calls that ended **before** `endTime` (exclusive).
   *
   * Use a more precise timestamp to narrow the results. For example:
   * - `2025-03-01` matches calls ending up to 2025-03-01T00:00:00Z
   * - `2025-03-01T14:00:00Z` matches calls ending up to 14:00:00Z on 2025-03-01
   */
  'endTime'?: Date;
  /**
   * Filter results to only include calls whose `callResult` matches the specified value.
   *
   * If omitted, calls with any result are included.
   */
  'callResult'?: CallResult;
  /**
   * Filter results to only include calls whose `callReason` matches the specified value.
   *
   * If omitted, calls with any reason are included.
   */
  'callReason'?: CallReason;
  /** Number of items to be returned on each page. */
  'pageSize'?: number;
  /** Page number (1-based) */
  'page'?: number;
}

export interface GetCallByIdRequestData {
  /** The ID of the call. */
  'callId': string;
}

export interface PatchCallByIdRequestData {
  /** The ID of the call. */
  'callId': string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. */
  'Idempotency-Key'?: string;
  /** Request body for patching an ongoing call with SVAML commands. */
  'callPatchRequestBody': CallPatchRequest;
}

export interface PatchCallBySessionAndNameRequestData {
  /** The ID of the session. */
  'sessionId': string;
  /** The name of the call leg within the session, as assigned by the `callName` property in the `dial` command. */
  'callName': string;
  /** Client-generated idempotency key to safely retry requests. The server uses this key to recognize retries of the same request. If a request with the same key is received within 10 minutes, the server returns the cached response from the original request. Using a random UUID (v4) is strongly recommended. */
  'Idempotency-Key'?: string;
  /** Request body for patching an ongoing call with SVAML commands. */
  'callPatchRequestBody': CallPatchRequest;
}
