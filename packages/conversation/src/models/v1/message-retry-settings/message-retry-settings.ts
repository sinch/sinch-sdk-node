
/**
 * This object contains settings related to message retry mechanism.
 */
export interface MessageRetrySettings {

  /**
   * The maximum duration, in seconds, for which to retry sending a message in case of a temporary processing failure. Time is counted after the first message processing failure. At least one retry is guaranteed.
   * Subsequent retry times are randomized with exponential backoff. If the next retry timestamp exceeds the configured time, one last retry will be performed on the cut-off time.
   * If the message has a configured fallback channel, a switch_on_channel will be triggered.
   * The valid values for this field are [30 - 3600]. Default value is 3600 (seconds - 1 hour).
   */
  retry_duration?: number;
}
