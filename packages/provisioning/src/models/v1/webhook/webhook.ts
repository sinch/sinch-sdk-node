import { WebhookTrigger } from '../webhook-trigger';

export interface Webhook {
  /** The ID of the webhook. */
  id: string;
  /** The target url where events will be sent to. */
  target: string;
  /** The project that this webhook belongs to. */
  projectId: string;
  /** List of triggers this webhook is triggered by. */
  triggers: WebhookTrigger[];
}
