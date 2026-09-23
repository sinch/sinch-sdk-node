import { WebhookTrigger } from '../webhook-trigger';

export interface WebhookUpdateRequest {
  /** A valid target url where events should be sent to. */
  target?: string;
  /** Secret to be used to sign contents of webhooks sent by the provisioning API. */
  secret?: string;
  /** List of triggers you want to be notified about on your webhook. */
  triggers?: WebhookTrigger[];
}
