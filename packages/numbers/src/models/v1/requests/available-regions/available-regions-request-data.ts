export type RegionNumberTypeEnum = 'NUMBER_TYPE_UNSPECIFIED' | 'MOBILE' | 'LOCAL' | 'TOLL_FREE';

export interface ListAvailableRegionsRequestData {
  /** Only returns regions for which numbers are provided with the given types v1: `MOBILE`, `LOCAL` or `TOLL_FREE`. However, you can indicate `NUMBER_TYPE_UNSPECIFIED: null` when searching.
   * - NUMBER_TYPE_UNSPECIFIED: Null value
   * - MOBILE: Numbers that belong to a specific range.
   * - LOCAL: Numbers that are assigned to a specific geographic region.
   * - TOLL_FREE: Number that are free of charge for the calling party but billed for all arriving calls.
   */
  types?: Array<RegionNumberTypeEnum>;
}
