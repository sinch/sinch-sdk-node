/**
 * Options for batch dialing
 */
export interface BatchOptions {
  /** Requested maximum call initiation rate, in calls per second (CPS), for this batch. Actual CPS may be lower depending on routing, carrier, and platform capacity, as well as account limitations. */
  maxCps?: number;
  /** Batch time-to-live (TTL). The maximum amount of time the platform will keep attempting to start queued call sessions in this batch. When the TTL expires, any call sessions that have not yet been initiated will stop being processed (calls already in progress are not affected). */
  ttlSeconds?: number;
}
