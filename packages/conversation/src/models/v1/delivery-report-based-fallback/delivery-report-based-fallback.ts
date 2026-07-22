
/**
 * This object contains additional settings related to [delivery report based fallback](https://developers.sinch.com/docs/conversation/keyconcepts/#delivery-report-base-message-fallback). Note that this is **paid** functionality.
 */
export interface DeliveryReportBasedFallback {

  /**
   * Optional. A flag specifying whether this app has enabled fallback message delivery upon no positive delivery report.
   * This feature is applicable only to messages which are sent to a recipient with more than one channel identity.
   * Identities must be defined on channels which support at least the 'DELIVERED' message state.
   * **Please note that this functionality requires payment.** */
  enabled?: boolean;
  /**
   * Optional. The time, in seconds, after which a message without a positive delivery report will fallback to the next channel.
   * Minimum value is 10 and maximum value is 259200. */
  delivery_report_waiting_time?: number;
}
