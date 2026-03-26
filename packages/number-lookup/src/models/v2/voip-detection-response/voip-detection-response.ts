import { ErrorResponse } from '../error-response';
import { VoIPProbability } from '../enums';

export interface VoIPDetectionResponse {
  /** Probability of number being VoIP based on the AI analysis. */
  probability?: VoIPProbability;
  /** @see ErrorResponse */
  error?: ErrorResponse;
}
