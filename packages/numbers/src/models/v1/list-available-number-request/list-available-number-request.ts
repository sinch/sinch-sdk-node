/**
 * Model: ListAvailableNumberRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { NumberPatternPattern } from '../number-pattern-pattern';
import { NumberPatternSearchPattern } from '../number-pattern-search-pattern';

/**
 * Available numbers schema base.
 */
export interface ListAvailableNumberRequest {
  /** @see NumberPatternPattern */
  NumberPattern?: NumberPatternPattern;
  /** @see NumberPatternSearchPattern */
  NumberPatternSearchPattern?: NumberPatternSearchPattern;
  /** Region code to filter by. ISO 3166-1 alpha-2 country code of the phone number. Example: `US`, `GB` or `SE`. */
  regionCode?: string;
  /** Number type to filter by. `MOBILE`, `LOCAL` or `TOLL_FREE`. */
  type?: string;
  /** Number capabilities to filter by, `SMS` and/or `VOICE`. */
  capabilities?: string[];
}
