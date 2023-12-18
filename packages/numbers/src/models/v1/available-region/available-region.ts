/**
 * Model: AvailableRegion
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

/**
 * A region for which numbers are provided.
 */
export interface AvailableRegion {
  /** ISO 3166-1 alpha-2 region code. Examples: `US`, `GB` or `SE`. */
  regionCode?: string;
  /** Display name of the region. Examples: United States, United Kingdom or Sweden. */
  regionName?: string;
  /** A list of the different number types available.  Examples: `MOBILE` or `LOCAL`. */
  types?: string[];
}
