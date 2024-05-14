import { ActiveNumber } from '../active-number';

/**
 * Response message to list your active phone numbers.
 */
export interface ActiveNumbersResponse {
  /** List of numbers associated to the client project specified in `ListActiveNumbers`. */
  activeNumbers?: ActiveNumber[];
  nextPageToken?: string;
  totalSize?: number;
}
