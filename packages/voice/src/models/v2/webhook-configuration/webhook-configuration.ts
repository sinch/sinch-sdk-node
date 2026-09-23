/**
 * Webhook configuration
 */
export interface WebhookConfiguration {
  /** Webhook URL */
  url: string;
  /**
   * Fallback webhook URL used when the primary webhook URL fails.
   *
   * A failed request is re-sent to this URL immediately. After repeated consecutive failures of the
   * primary URL, requests are sent only here until the primary URL recovers.
   */
  fallbackUrl?: string;
}
