/**
 * Triggers a mid-call webhook to the application backend, allowing it to return a new set of SVAML commands that control the remainder of the call flow.  This is a blocking command — execution pauses until a response is received from the webhook endpoint. The next command in the sequence runs only after the backend responds. Webhook requests use a 5-second timeout. If a `fallbackUrl` is provided, a failed request is re-sent to it — see *Timeouts and failover* in the **Webhooks** section for the authoritative algorithm.
 */
export interface CallbackCommand {
  /** Command to trigger a mid-call webhook */
  command: CommandEnum;
  /** Name for this webhook event. When triggered, the webhook request\'s `event` property will contain this name prepended with `call.webhook.`.  For example, if `webhookName` is set to `\"my.custom.event\"`, the event will be delivered as `\"call.webhook.my.custom.event\"`. */
  webhookName: string;
  /** URL of the webhook endpoint to send the mid-call event to. */
  url: string;
  /** Fallback webhook URL used when the primary webhook URL fails.  A failed request is re-sent to this URL immediately. After repeated consecutive failures of the primary URL, requests are sent only here until the primary URL recovers.  See *Timeouts and failover* in the **Webhooks** section for the authoritative algorithm. */
  fallbackUrl?: string;
}
export type CommandEnum = 'webhook' | string;
/** Validation regex for webhookName */
export const webhookNamePattern = /^\S+$/;
