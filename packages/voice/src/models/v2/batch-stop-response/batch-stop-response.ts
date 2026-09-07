/**
 * Response returned when batch processing cancellation is accepted.
 */
export interface BatchStopResponse {
  /** State of the batch processing cancellation request. `STOP_REQUESTED` means no new calls will be initiated. */
  result?: ResultEnum;
}

export type ResultEnum = 'STOP_REQUESTED' | string;
