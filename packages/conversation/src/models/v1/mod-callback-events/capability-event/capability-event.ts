import { ConversationChannel } from '../../conversation-channel';
import { Reason } from '../../reason';
import { ConversationCallbackEvent } from '../conversation-callback-event';

/**
 * This callback is used to deliver the results of the asynchronous capability checks.
 */
export interface CapabilityEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'CAPABILITY';
  /** @see CapabilityNotification */
  capability_notification?: CapabilityNotification;
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
  capability_status?: 'CAPABILITY_UNKNOWN' | 'CAPABILITY_FULL' | 'CAPABILITY_PARTIAL' | 'NO_CAPABILITY';
  /** When capability_status is set to CAPABILITY_PARTIAL, this field includes a list of the supported channel-specific capabilities reported by the channel. */
  channel_capabilities?: string[];
  /** @see Reason */
  reason?: Reason;
}
