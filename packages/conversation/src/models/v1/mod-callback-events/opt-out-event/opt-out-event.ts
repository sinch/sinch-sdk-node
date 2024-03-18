import { ConversationChannel } from '../../conversation-channel';
import { ConversationCallbackEvent } from '../conversation-callback-event';
import { ProcessingMode } from '../../enums';

/**
 * This callback is used to deliver opt-out notifications from the channels.
 */
export interface OptOutEvent extends ConversationCallbackEvent {
  /** Name of the trigger responsible for this event. */
  trigger: 'OPT_OUT';
  /** @see OptOutNotification */
  opt_out_notification?: OptOutNotification;
}

export interface OptOutNotification {
  /** ID generated when making an opt-out registration request. Can be used to detect duplicates. */
  request_id?: string;
  /** The ID of the contact which is the subject of the opt-out. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The channel identity. For example, a phone number for SMS, WhatsApp and Viber Business. */
  identity?: string;
  /** Status of the opt-out registration. */
  status?: 'OPT_OUT_SUCCEEDED' | 'OPT_OUT_FAILED' | 'OPT_OUT_STATUS_UNSPECIFIED';
  /** @see OptOutNotificationErrorDetails */
  error_details?: OptOutNotificationErrorDetails;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}

/**
 * This field is populated if the opt-out failed.
 */
export interface OptOutNotificationErrorDetails {
  /** Human-readable error description. */
  description?: string;
}
