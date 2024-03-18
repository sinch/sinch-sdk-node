import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ChannelIdentity } from '../../channel-identity';
import { ProcessingMode } from '../../enums';
import { Reason } from '../../reason';

export interface RecordNotificationEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'RECORD_NOTIFICATION';
  /** @see RecordNotification */
  record_notification?: RecordNotification;
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
