import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ChannelIdentity } from '../../channel-identity';
import { ProcessingMode } from '../../enums';
import { Reason } from '../../reason';

export interface RecordNotificationEvent extends ConversationCallbackEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback's documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see SmartConversationNotification */
  record_notification?: RecordNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'RECORD_NOTIFICATION';
}

export interface RecordNotification  {
  /** Required. The ID of the entity. */
  entityId: string;
  /** Required. The stored status. */
  recordStatus: RecordStatus;
  /** Required. The processing mode. */
  processingMode: ProcessingMode;
  /** The channel and contact channel identity of the entity. */
  channelIdentity?: ChannelIdentity
  /** Optional. The ID of the contact. Will not be present for apps in Dispatch Mode. */
  contactId: string;
  /** Optional. The ID of the conversation. Will not be present for apps in Dispatch Mode. */
  conversationId: string;
  /** Optional. A reason will be present if the status is FAILED. */
  reason: Reason;
}


type RecordStatus = 'RECORD_STATUS_UNSPECIFIED'
  | 'EVENT_RECORD_STORED'
  | 'UNRECOGNIZED';
