/**
 * Response returned when batch processing cancellation is accepted (HTTP 202).
 * `STOP_REQUESTED` means no new calls will be initiated; calls already in progress continue.
 */
export interface BatchStopResponse {
  /** State of the batch processing cancellation request. `STOP_REQUESTED` means no new calls will be initiated. */
  result?: ResultEnum;
}

export type ResultEnum = 'STOP_REQUESTED' | string;
