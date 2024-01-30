import { ConversationChannel } from '../conversation-channel';
import { Reason } from '../reason';

/**
 * This callback is used to deliver the results of the asynchronous capability checks.
 */
export interface CapabilityEvent {

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
  /** @see CapabilityEventCapabilityNotification */
  capability_notification?: CapabilityNotification;

  trigger: 'CAPABILITY';
}

export interface CapabilityNotification {

  /** ID generated when submitting the capability request. Can be used to detect duplicates. */
  request_id?: string;
  /** The ID of the contact. */
  contact_id?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The channel identity. For example, a phone number for SMS, WhatsApp, and Viber Business. */
  identity?: string;
  /** Status indicating the recipient\'s capability on the channel. */
  capability_status?: CapabilityStatusEnum;
  /** When capability_status is set to CAPABILITY_PARTIAL, this field includes a list of the supported channel-specific capabilities reported by the channel. */
  channel_capabilities?: string[];
  /** @see Reason */
  reason?: Reason;
}
export type CapabilityStatusEnum = 'CAPABILITY_UNKNOWN' | 'CAPABILITY_FULL' | 'CAPABILITY_PARTIAL' | 'NO_CAPABILITY';
