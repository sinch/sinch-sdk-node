import { CallbackSettings } from '../callback-settings';
import { ConversationChannelCredentialRequest } from '../conversation-channel-credential';
import { DispatchRetentionPolicy } from '../dispatch-retention-policy';
import { RetentionPolicy } from '../retention-policy';
import { SmartConversation } from '../smart-conversation';
import { ConversationMetadataReportView, ProcessingMode } from '../enums';
import { MessageRetrySettings } from '../message-retry-settings';
import { DeliveryReportBasedFallback } from '../delivery-report-based-fallback';

/**
 * The request sent to the API endpoint to update the configuration of an app.
 */
export interface AppUpdateRequest {

  /** An array of channel credentials. The order of the credentials defines the app channel priority. */
  channel_credentials?: ConversationChannelCredentialRequest[];
  /** @see ConversationMetadataReportView */
  conversation_metadata_report_view?: ConversationMetadataReportView;
  /** The display name for the app. */
  display_name?: string;
  /** @see RetentionPolicy */
  retention_policy?: RetentionPolicy;
  /** @see DispatchRetentionPolicy */
  dispatch_retention_policy?: DispatchRetentionPolicy;
  /** Whether or not Conversation API should store contacts and conversations for the app. For more information, see [Processing Modes](../../../../../conversation/processing-modes/). */
  processing_mode?: ProcessingMode;
  /** @see SmartConversation */
  smart_conversation?: SmartConversation;
  /** @see CallbackSettings */
  callback_settings?: CallbackSettings;
  /** @see MessageRetrySettings */
  message_retry_settings?: MessageRetrySettings;
  /** @see DeliveryReportBasedFallback */
  delivery_report_based_fallback?: DeliveryReportBasedFallback;
}
