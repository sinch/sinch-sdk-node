import { ConversationChannelCredential } from '../conversation-channel-credential';
import { DispatchRetentionPolicy } from '../dispatch-retention-policy';
import { QueueStats } from '../queue-stats';
import { RateLimits } from '../rate-limits';
import { RetentionPolicy } from '../retention-policy';
import { SmartConversation } from '../smart-conversation';
import { CallbackSettings } from '../callback-settings';
import { ConversationMetadataReportView, ProcessingMode } from '../enums';

/**
 * The response showing information about the app.
 */
export interface AppResponse {

  /** An array of channel credentials. The order of the credentials defines the app channel priority. */
  channel_credentials?: ConversationChannelCredential[];
  /** @see ConversationMetadataReportView */
  conversation_metadata_report_view?: ConversationMetadataReportView;
  /** The display name for the app. */
  display_name?: string;
  /** The ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  id?: string;
  /** @see RateLimits */
  rate_limits?: RateLimits;
  /** @see RetentionPolicy */
  retention_policy?: RetentionPolicy;
  /** @see DispatchRetentionPolicy */
  dispatch_retention_policy?: DispatchRetentionPolicy;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode?: ProcessingMode;
  /** @see SmartConversation */
  smart_conversation?: SmartConversation;
  /** @see QueueStats */
  queue_stats?: QueueStats;

  /** Message status persistence configuration. */
  persist_message_status?: PersistMessageStatus;
  /** Message search configuration */
  message_search?: MessageSearch;
  /** Additional callback configuration. */
  callback_settings?: CallbackSettings;
  /** Fallback upon no positive delivery report configuration. */
  delivery_report_based_fallback?: DeliveryReportBasedFallback | null;
  /** Message retry time configuration. */
  message_retry_settings?: MessageRetrySettings | null;
}

export interface PersistMessageStatus {
  /** A flag specifying whether message status for this app should be persisted. */
  enabled?: boolean;
}

export interface MessageSearch {
  /** A flag specifying whether this app has enabled Message Search services. */
  enabled?: boolean;
}

export interface DeliveryReportBasedFallback {
  /** A flag specifying whether this app has enabled fallback upon no positive delivery report feature. Disabled by default */
  enabled?: boolean;
  /** The time, in seconds, after which a message without a positive delivery report will fallback to the next channel. The valid values for this field are [60 - 259200]. */
  delivery_report_waiting_time?: number;
}

export interface MessageRetrySettings {
  /**
   * The maximum duration, in seconds, for which to retry sending a message in case of a temporary processing failure. Time is counted after the first message processing failure. At least one retry is guaranteed.
   * Subsequent retry times are randomized with exponential backoff. If the next retry timestamp exceeds the configured time, one last retry will be performed on the cut-off time.
   * If the message has a  configured fallback channel, a switch_on_channel will be triggered.
   * The valid values for this field are [30 - 3600]. Default value is 3600 (seconds - 1 hour).
   */
  retry_duration?: number;
}
