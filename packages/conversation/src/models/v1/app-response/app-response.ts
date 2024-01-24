import { ConversationChannelCredential } from '../conversation-channel-credential';
import { ConversationMetadataReportView } from '../conversation-metadata-report-view';
import { DispatchRetentionPolicy } from '../dispatch-retention-policy';
import { QueueStats } from '../queue-stats';
import { RateLimits } from '../rate-limits';
import { RetentionPolicy } from '../retention-policy';
import { SmartConversation } from '../smart-conversation';
import { ProcessingMode } from '../processing-mode';
import { CallbackSettings } from '../callback-settings';

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

  /** TBC: Not documented */
  persist_message_status?: Enabled;
  /** TBC: Not documented */
  message_search?: Enabled;
  /** TBC: Not documented @see CallbackSettings */
  callback_settings?: CallbackSettings;
  /** TBC: Not documented */
  delivery_report_based_fallback?: DeliveryReportBasedFallback | null;
  /** TBC: Not documented */
  message_retry_settings?: null;
}

export interface Enabled {
  enabled?: boolean;
}

export interface DeliveryReportBasedFallback {
  enabled?: boolean;
  delivery_report_waiting_time?: number;
}
