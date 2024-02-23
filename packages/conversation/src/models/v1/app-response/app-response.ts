import { ConversationChannelCredential } from '../conversation-channel-credential';
import { DispatchRetentionPolicy } from '../dispatch-retention-policy';
import { QueueStats } from '../queue-stats';
import { RateLimits } from '../rate-limits';
import { RetentionPolicy } from '../retention-policy';
import { SmartConversation } from '../smart-conversation';
import { CallbackSettings } from '../callback-settings';
import { ConversationMetadataReportView, ProcessingMode } from '../enums';
import { DeliveryReportBasedFallback } from '../delivery-report-based-fallback';
import { MessageRetrySettings } from '../message-retry-settings';

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
