/**
 * Summary of a batch call operation, including counts of call sessions by state and overall progress.
 */
export interface BatchSummary {
  /** Unique identifier of the batch call operation (ULID). */
  batchId: string;
  /** Total number of call sessions requested in this batch. */
  sessionCount: number;
  /** Number of call sessions that are queued and waiting to be initiated (not yet in progress). */
  queued: number;
  /** Number of call sessions that are in progress. */
  inProgress: number;
  /** Number of call sessions that have completed successfully. */
  completed: number;
  /** Number of queued call sessions that were not initiated before the batch TTL (`ttlSeconds`) elapsed and therefore expired. */
  expired: number;
  /** Requested maximum call initiation rate, in calls per second (CPS), for this batch. Actual CPS may be lower depending on routing, carrier, and platform capacity, as well as account limitations. */
  requestedCps: number;
  /** Timestamp (RFC 3339) when the batch finished processing (all call sessions reached a final state). Omitted if the batch is still in progress or has not completed yet. */
  endTime?: Date;
  /** Batch time-to-live (TTL) in seconds. The maximum amount of time the platform will keep attempting to start queued call sessions in this batch. When the TTL expires, any call sessions that have not yet been initiated will stop being processed (calls already in progress are not affected). */
  ttlSeconds?: number;
}
