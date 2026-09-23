import { Call } from '../call';
import { PaginationLinks } from '../pagination-links';
import { PaginationMeta } from '../pagination-meta';

/**
 * List of calls.
 */
export interface CallsList {
  /** Array of call resources */
  calls: Call[];
  /** @see PaginationLinks */
  links: PaginationLinks;
  /** @see PaginationMeta */
  meta: PaginationMeta;
}
