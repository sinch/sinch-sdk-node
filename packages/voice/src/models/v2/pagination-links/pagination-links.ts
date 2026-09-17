/**
 * Pagination links for navigating through pages of results in a paginated list response.
 *
 * Available link properties:
 * - `first` - Absolute URI of the first page
 * - `last` - Absolute URI of the last page
 * - `next` - Absolute URI of the next page (omitted if this is the last page)
 * - `prev` - Absolute URI of the previous page (omitted if this is the first page)
 * - `self` - Absolute URI of the current page
 */
export interface PaginationLinks {
  /** Absolute URI of the first page. */
  first: string;
  /** Absolute URI of the last page. */
  last: string;
  /** Absolute URI of the current page. */
  self: string;
  /** Absolute URI of the next page (omitted if this is the last page). */
  next?: string;
  /** Absolute URI of the previous page (omitted if this is the first page). */
  prev?: string;
}
