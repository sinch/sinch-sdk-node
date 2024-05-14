import { AvailableRegion } from '../available-region';

/**
 * Response message to list regions for which numbers are provided.
 */
export interface ListAvailableRegionsResponse {
  /**  */
  availableRegions?: AvailableRegion[];
}
