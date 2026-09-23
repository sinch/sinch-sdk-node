import { PaginationLinks } from '../pagination-links';
import { PaginationMeta } from '../pagination-meta';
import { ServiceShortResponse } from '../service-short-response';

/**
 * List of available voice services in the project.
 */
export interface ServiceList {
  /** Array of voice service resources */
  services: ServiceShortResponse[];
  /** @see PaginationLinks */
  links: PaginationLinks;
  /** @see PaginationMeta */
  meta: PaginationMeta;
}
