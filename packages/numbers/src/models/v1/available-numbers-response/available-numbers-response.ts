import { AvailableNumber } from '../available-number';

/**
 * Response message to list available phone numbers.
 */
export interface AvailableNumbersResponse {
  /** List of available phone numbers. */
  availableNumbers?: AvailableNumber[];
}
