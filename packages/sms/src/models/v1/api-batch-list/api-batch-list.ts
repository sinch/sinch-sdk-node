/**
 * Model: ApiBatchList
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ApiBatchListBatchesInner } from '../api-batch-list-batches-inner';

export interface ApiBatchList {

  /** The total number of entries matching the given filters. */
  count?: number;
  /** The requested page. */
  page?: number;
  /** The page of batches matching the given filters. */
  batches?: ApiBatchListBatchesInner[];
  /** The number of entries returned in this request. */
  page_size?: number;
}


