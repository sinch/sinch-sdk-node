import { Webhook } from '../../webhook';

export interface CreateWebhookRequestData {
  /** Required. The Webhook to create */
  'webhookCreateRequestBody': Webhook;
}
export interface DeleteWebhookRequestData {
  /** The unique ID of the webhook. */
  'webhook_id': string;
}
export interface GetWebhookRequestData {
  /** The unique ID of the webhook. */
  'webhook_id': string;
}
export interface ListWebhooksRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
}
export interface UpdateWebhookRequestData {
  /** The unique ID of the webhook. */
  'webhook_id': string;
  /** Required. The Webhook to update */
  'webhookUpdateRequestBody': Webhook;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}
