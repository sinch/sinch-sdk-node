import { NumberTypeEnum } from '../../enums';

/** @deprecated Use `NumberTypeEnum` instead. */
export type RegionNumberTypeEnum = 'NUMBER_TYPE_UNSPECIFIED' | 'MOBILE' | 'LOCAL' | 'TOLL_FREE';

export interface ListAvailableRegionsRequestData {
  /** Only returns regions for which numbers are provided with the given types v1: `MOBILE`, `LOCAL` or `TOLL_FREE`.
   * - MOBILE: Numbers that belong to a specific range.
   * - LOCAL: Numbers that are assigned to a specific geographic region.
   * - TOLL_FREE: Number that are free of charge for the calling party but billed for all arriving calls.
   *
   * If you want to see all results, do not add the `types` query parameter.
   */
  types?: Array<NumberTypeEnum>;
}
