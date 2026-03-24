import { ErrorResponse } from '../error-response';
import { SwapPeriod } from '../enums';

export interface SimSwapResponse {
  /** Indicates whether SIM was changed. */
  swapped?: boolean;
  /** Threshold for sim swap check. */
  swapPeriod?: SwapPeriod;
  /** @see ErrorResponse */
  error?: ErrorResponse;
}
