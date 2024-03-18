import { ConversationChannel } from '../../conversation-channel';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ProcessingMode } from '../../enums';

/**
 * This callback is used to deliver opt-in notifications from the channels.
 */
export interface OptInEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'OPT_IN';
  /** @see OptInNotification */
  opt_in_notification?: OptInNotification;
}

export interface OptInNotification {
  /** ID generated when making an opt-in registration request. Can be used to detect duplicates. */
  request_id?: string;
  /** The ID of the contact which is the subject of the opt-in. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The channel identity. For example, a phone number for SMS, WhatsApp and Viber Business. */
  identity?: string;
  /** Status of the opt-in registration. */
  status?: 'OPT_IN_SUCCEEDED' | 'OPT_IN_FAILED' | 'OPT_IN_STATUS_UNSPECIFIED';
  /** @see OptInNotificationErrorDetails */
  error_details?:OptInNotificationErrorDetails;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}

/**
 * This field is populated if the opt-in failed.
 */
export interface OptInNotificationErrorDetails {
  /** Human-readable error description. */
  description?: string;
}
