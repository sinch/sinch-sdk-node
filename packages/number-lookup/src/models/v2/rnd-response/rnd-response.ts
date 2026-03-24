import { ErrorResponse } from '../error-response';

export interface RndResponse {
  /** Provides information whether the number was disconnected after provided last contact date. */
  disconnected?: boolean;
  /** @see ErrorResponse */
  error?: ErrorResponse;
}
