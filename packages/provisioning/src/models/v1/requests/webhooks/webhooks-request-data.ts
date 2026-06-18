import { WebhookCreateRequest } from '../../webhook-create-request';
import { WebhookUpdateRequest } from '../../webhook-update-request';

export interface ListWebhooksRequestData {
  /** The page token if retrieving the next page from a previous query. */
  pageToken?: string;
  /** The page size requested. */
  pageSize?: number;
}

export interface CreateWebhookRequestData {
  /** Webhook to register */
  webhookCreateRequestBody: WebhookCreateRequest;
}

export interface GetWebhookRequestData {
  /** The unique ID of the webhook. */
  webhookId: string;
}

export interface DeleteWebhookRequestData {
  /** The unique ID of the webhook. */
  webhookId: string;
}

export interface ReplaceWebhookRequestData {
  /** The unique ID of the webhook. */
  webhookId: string;
  /** Webhook to replace */
  webhookReplaceRequestBody: WebhookCreateRequest;
}

export interface UpdateWebhookRequestData {
  /** The unique ID of the webhook. */
  webhookId: string;
  /** Webhook to update */
  webhookUpdateRequestBody: WebhookUpdateRequest;
}
