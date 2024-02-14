export interface RateLimits {

  /** The number of inbound messages/events we process per second, from underlying channels to the app.  The default rate limit is 25. */
  inbound?: number;
  /** The number of messages/events we process per second, from the app to the underlying channels. Note that underlying channels may have other rate limits.  The default rate limit is 25. */
  outbound?: number;
  /** The rate limit of callbacks sent to the webhooks registered for the app. Note that if you have multiple webhooks with shared triggers, multiple callbacks will be sent out for each triggering event. The default rate limit is 25. */
  webhooks?: number;
}
