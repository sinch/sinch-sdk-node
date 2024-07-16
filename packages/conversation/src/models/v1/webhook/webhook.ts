import { ClientCredentials } from '../client-credentials';
import { WebhookTrigger } from '../webhook-trigger';
import { WebhookTargetType } from '../enums';

/**
 * Represents a destination for receiving callbacks from the Conversation API.
 */
export interface Webhook {
  /** The app that this webhook belongs to. */
  app_id: string;
  /** @see ClientCredentials */
  client_credentials?: ClientCredentials;
  /** The ID of the webhook. */
  id?: string;
  /** Optional secret be used to sign contents of webhooks sent by the Conversation API. You can then use the secret to verify the signature. */
  secret?: string;
  /** The target url where events should be sent to. Maximum URL length is 742. The conversation-api.*.sinch.com subdomains are forbidden. */
  target: string;
  /** @see WebhookTargetType */
  target_type?: WebhookTargetType;
  /** An array of triggers that should trigger the webhook and result in an event being sent to the target url. Refer to the list of [Webhook Triggers](/docs/conversation/callbacks#webhook-triggers) for a complete list. */
  triggers: WebhookTrigger[];
}

export interface UpdateWebhookRequestBody extends
  Pick<Webhook, 'target'>,
  Partial<Pick<Webhook, 'app_id' | 'triggers' | 'secret' | 'target_type' | 'client_credentials'>> {}

export interface CreateWebhookRequestBody extends
  Pick<Webhook, 'app_id' | 'target'>,
  Partial<Pick<Webhook, 'triggers' | 'secret' | 'target_type' | 'client_credentials'>> {}
