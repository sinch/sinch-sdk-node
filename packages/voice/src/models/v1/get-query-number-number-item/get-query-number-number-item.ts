/**
 * Model: GetQueryNumberNumberItem
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { GetQueryNumberNumberItemRate } from '../get-query-number-number-item-rate';

/**
 * The number item object.
 */
export interface GetQueryNumberNumberItem {

  /** The ISO 3166-1 formatted country code. */
  countryId?: string;
  /** The type of the number. */
  numberType?: NumberTypeEnum;
  /** The number in E.164 format. */
  normalizedNumber?: string;
  /** Concerns whether the call is restricted or not. */
  restricted?: boolean;
  /** @see GetQueryNumberNumberItemRate */
  rate?: GetQueryNumberNumberItemRate;
}

export type NumberTypeEnum = 'Unknown' | 'Fixed' | 'Mobile' | 'Other';

