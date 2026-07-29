import { Webhook } from '../webhook';

export interface ListWebhooksResponse {
  /** Total size of the entries matching the search query. */
  totalSize: number;
  /** Requested size of the page. */
  pageSize: number;
  /** Encoded token to use in list request to fetch previous batch of entries. */
  previousPageToken?: string;
  /** Encoded token to use in list request to fetch next batch of entries. */
  nextPageToken?: string;
  /** List of Webhooks */
  webhooks: Webhook[];
}
