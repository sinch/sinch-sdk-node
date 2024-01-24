import { Webhook } from '../webhook';

export interface ListWebhooksResponse {

  /** List of webhooks belonging to a specific project ID and app ID */
  webhooks?: Webhook[];
}
